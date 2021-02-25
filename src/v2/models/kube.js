/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.

import _ from 'lodash';
import { isRequired } from '../lib/utils';
import logger from '../lib/logger';

// Abstract class for models that communicate with the kubernetes api
export default class Kube {
  constructor({ kubeConnector = isRequired('kubeConnector'), updateUserNamespaces }) {
    this.kubeConnector = kubeConnector;
    this.updateUserNamespaces = updateUserNamespaces;
  }

  async getResourceInfo({ apiVersion, kind }) {
    // dynamically get resource information from kubernetes API
    const k8sPaths = await this.kubeConnector.getK8sPaths();
    if (k8sPaths) {
      const apiPath = k8sPaths.find((path) => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        const k8sResourceList = await this.kubeConnector.get(`${apiPath}`).catch((err) => {
          logger.error(err);
          throw err;
        });
        const lowerKind = kind.toLowerCase();
        const matchesKind = (value) => value.toLowerCase() === lowerKind;
        const resourceType = k8sResourceList.resources.find((item) => (matchesKind(item.kind) || matchesKind(item.name) || matchesKind(item.singularName))
          && item.name.indexOf('/') < 0);
        return [apiPath, resourceType];
      }
    }
    return [undefined, undefined];
  }

  async getResourceEndPoint({ apiVersion, kind, ...resource }) {
    const [apiPath, resourceType] = await this.getResourceInfo({ apiVersion, kind });
    if (apiPath) {
      const namespace = _.get(resource, 'metadata.namespace');
      const { name, namespaced } = resourceType || {};
      if (!name || (namespaced && !namespace)) {
        return null;
      }
      const namespaceSegments = namespaced ? `namespaces/${namespace}/` : '';
      return `${apiPath}/${namespaceSegments}${name}`;
    }
    return undefined;
  }
}
