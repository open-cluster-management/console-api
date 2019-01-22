/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import gremlin from 'gremlin';
import config from '../../../config';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';

const { P } = gremlin.process;

// TODO: Need a better solution to handle this connection error, using this ugly
//      workaround for now because the gremlin client doesn't expose the websocket connection.
process.on('uncaughtException', (e) => {
  const gremlinEndpoint = config.get('gremlinEndpoint');
  if (e.errno === 'ECONNREFUSED' && gremlinEndpoint.indexOf(e.port) > -1) {
    logger.error(`Error initializing connection to Gremlin server at: ${gremlinEndpoint}. Search queries won't work.`);
    gremlinConnection = undefined; // eslint-disable-line no-use-before-define
  } else {
    throw e;
  }
});

function formatResult(result) {
  const resultObjects = [];
  result.forEach((resource) => {
    const resourceObj = {};
    resource.forEach((value, key) => {
      resourceObj[key] = value.length === 1 ? value[0] : value;
    });
    resultObjects.push(resourceObj);
  });
  return resultObjects;
}

let gremlinConnection;
const initializeGremlinConnection = () => new Promise(async (resolve, reject) => {
  const securityEnabled = config.get('gremlinSecurityEnabled');
  const gremlinEndpoint = securityEnabled ? config.get('gremlinEndpoint').replace('ws:', 'wss:') : config.get('gremlinEndpoint');
  const gremlinUsername = config.get('gremlinUsername');
  const gremlinPassword = config.get('gremlinPassword');

  const authenticator = securityEnabled ?
    new gremlin.driver.auth.PlainTextSaslAuthenticator(gremlinUsername, gremlinPassword) : {};
  const connOpts = securityEnabled ? { authenticator, rejectUnauthorized: false } : {};

  try {
    const gremlinClient = new gremlin.driver.Client(gremlinEndpoint, connOpts);
    await gremlinClient.open();
    await gremlinClient.submit('graph = TinkerGraph.open()');

    const remoteConnection = new gremlin.driver.DriverRemoteConnection(gremlinEndpoint, connOpts);
    const graph = new gremlin.structure.Graph();
    const g = graph.traversal().withRemote(remoteConnection);
    await g.V().limit(1).toList(); // Send request to force authentication.
    logger.info(`Initialized connection to gremlin server at: ${gremlinEndpoint}`);

    resolve({ gremlinClient, remoteConnection, g });
  } catch (e) {
    logger.error('Error initializing connection to gremlin server.', e);
    reject(e);
  }
});
const getValidatedConnection = () => new Promise(async (resolve, reject) => {
  try {
    if (gremlinConnection === undefined) {
      logger.info('Initializing new gremlin connection.');
      gremlinConnection = initializeGremlinConnection();
    }

    let connection = await Promise.race([gremlinConnection, new Promise(r => setTimeout(r, 5000))]);
    if (connection === undefined) {
      logger.error('Timed out waiting for connection to gremlin server.');
      reject(new Error('Timed out waiting for connection to gremlin server.'));
    }
    // eslint-disable-next-line no-underscore-dangle
    if (connection.gremlinClient._connection._ws._finalized ||
      connection.remoteConnection._ws._finalized) { // eslint-disable-line no-underscore-dangle
      logger.info('Gremlin server connection was finalized. Initializing new connection.');
      gremlinConnection = initializeGremlinConnection();
      connection = await gremlinConnection;
    }
    resolve(connection);
  } catch (e) {
    logger.info('Error validating gremlin connection.', e);
    reject(e);
  }
});

export default class SearchConnector {
  constructor({
    rbac = isRequired('rbac'),
  } = {}) {
    this.rbac = rbac;
    this.initialize();
  }

  async initialize() {
    if (gremlinConnection === undefined) {
      gremlinConnection = initializeGremlinConnection();
    }
    const connection = await getValidatedConnection();
    this.gremlinClient = connection.gremlinClient;
    this.remoteConnection = connection.remoteConnection;
    this.g = connection.g;
  }


  async getLastUpdatedTimestamp() {
    await this.initialize();
    try {
      const lastUpdated = await this.gremlinClient.submit("graph.variables().get('lastUpdatedTimestamp').get()");
      return lastUpdated.traversers[0];
    } catch (e) {
      return 0;
    }
  }

  async runSearchQuery(searchProperties) {
    logger.debug('Running search', searchProperties);
    await this.initialize();
    await this.gremlinClient.submit(`graph.variables().set('lastActivityTimestamp', ['${Date.now()}'])`);

    const v = this.g.V().has('_rbac', P.within(this.rbac));
    searchProperties.forEach(searchProp => v.has(searchProp.property, P.within(searchProp.values)));
    return v.valueMap().toList().then(result => formatResult(result));
  }

  async runSearchQueryCountOnly(searchProperties) {
    logger.debug('Running search (count only)', searchProperties);
    await this.initialize();
    const v = this.g.V().has('_rbac', P.within(this.rbac));
    searchProperties.forEach(searchProp => v.has(searchProp.property, P.within(searchProp.values)));
    return v.count().next().then(result => result.value);
  }

  async getAllProperties() {
    // TODO: Maybe there's a more efficient query.
    await this.initialize();
    const v = this.g.V().has('_rbac', P.within(this.rbac));
    const properties = await v.properties().dedup().toList();
    const values = new Set(['kind', 'name', 'namespace', 'status']); // Add these first so they show at the top.
    properties.forEach((prop) => {
      values.add(prop.label);
    });

    return [...values].filter(item => item.charAt(0) !== '_');
  }

  async getAllValues(property, propFilters = []) {
    logger.debug('Getting all values for property:', property);
    await this.initialize();
    // TODO: Need to use a more efficient query.
    const resultValues = [];
    const v = this.g.V().has('_rbac', P.within(this.rbac));
    propFilters.forEach(propFilter => v.has(propFilter.property, P.within(propFilter.values)));
    await v.valueMap(property).dedup().toList()
      .then((result) => {
        result.forEach((valueMap) => {
          const values = valueMap.get(property) || [];
          values.forEach(value => resultValues.push(value));
        });
      });

    return resultValues;
  }
}
