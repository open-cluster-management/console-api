/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import logger from '../lib/logger';
import config from '../../../config';

const POLICY_FAILURE_STATUS = 'Failure';

function getTemplates(policy = {}) {
  const templates = [];
  Object.entries(policy.spec || []).forEach(([key, value]) => {
    if (key.endsWith('-templates')) {
      value.forEach(item => templates.push({ ...item, templateType: key }));
    }
  });
  return templates;
}


export default class ComplianceModel {
  constructor({ kubeConnector }) {
    if (!kubeConnector) {
      throw new Error('kubeConnector is a required parameter');
    }

    this.kubeConnector = kubeConnector;
  }


  async createPolicy(resources) {
    // TODO: revist this, do something like application,
    // combine policy and compliance into one mutation
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`/apis/policy.open-cluster-management.io/v1/namespaces/${namespace}/policies`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code >= 400 || item.status === POLICY_FAILURE_STATUS) {
        errorMessage += `${item.message}\n`;
      }
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }


  async createCompliance(resources) {
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${namespace}/compliances`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code >= 400 || item.status === POLICY_FAILURE_STATUS) {
        errorMessage += `${item.message}\n`;
      }
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }

  async getCompliances(name, namespace) {
    let policies = [];

    if (!name) {
      // for getting policy list
      const policyResponse = await this.kubeConnector.getResources(ns => `/apis/policy.open-cluster-management.io/v1/namespaces/${ns}/policies`);
      if (policyResponse.code || policyResponse.message) {
        logger.error(`HCM ERROR ${policyResponse.code} - ${policyResponse.message}`);
      }
      policies = policyResponse || [];
    } else {
      // get single policy with a specific name - walkaround of no type field
      const policyResponse = await this.kubeConnector.get(`/apis/policy.open-cluster-management.io/v1/namespaces/${namespace}/policies/${name}`);
      if (policyResponse.code || policyResponse.message) {
        logger.error(`HCM ERROR ${policyResponse.code} - ${policyResponse.message}`);
      } else {
        policies.push(policyResponse);
      }
    }
    return policies.map(entry => ({
      ...entry,
      raw: entry,
      name: _.get(entry, 'metadata.name', ''),
      namespace: _.get(entry, 'metadata.namespace', ''),
      remediation: _.get(entry, 'spec.remediationAction', ''),
      selfLink: _.get(entry, 'metadata.selfLink', ''),
      apiVersion: _.get(entry, 'apiVersion', ''),
    }));
  }


  static resolveCompliancePolicies(parent) {
    const aggregatedStatus = _.get(parent, 'status.status');
    // compliance that has aggregatedStatus
    if (aggregatedStatus) return this.resolvePolicyFromStatus(aggregatedStatus, parent);
    // in this case, a compliance doesn't connect with a
    // placementPolicy may not have aggregatedStatus
    return this.resolvePolicyFromSpec(parent);
  }

  static resolveCompliancePolicy(parent) {
    const aggregatedStatus = _.get(parent, 'status.status');
    return this.resolveCompliancePoliciesFromSpec(parent, aggregatedStatus);
  }

  static resolveCompliancePoliciesFromSpec(parent, aggregatedStatus) {
    const compliancePolicies = [];
    const policies = _.get(parent, 'spec.runtime-rules', []);
    policies.forEach((policy) => {
      compliancePolicies.push({
        name: _.get(policy, 'metadata.name'),
        complianceName: _.get(parent, 'metadata.name'),
        complianceNamespace: _.get(parent, 'metadata.namespace'),
        complianceSelfLink: _.get(parent, 'metadata.selfLink'),
        roleTemplates: this.resolvePolicyTemplates(policy, 'role-templates'),
        roleBindingTemplates: this.resolvePolicyTemplates(policy, 'roleBinding-templates'),
        objectTemplates: this.resolvePolicyTemplates(policy, 'object-templates'),
        detail: this.resolvePolicyDetails(policy),
        raw: policy,
      });
    });

    if (aggregatedStatus) {
      Object.values(aggregatedStatus).forEach((cluster) => {
        Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
          const policy = parent.spec['runtime-rules'].find(p => p.metadata.name === key);

          const policyObject = {
            compliant: this.resolveStatus(value),
            enforcement: _.get(policy, 'spec.remediationAction', 'unknown'),
            message: _.get(value, 'message', '-'),
            rules: this.resolvePolicyRules(policy), // TODO: Use resolver.
            status: this.resolveStatus(value),
            violations: this.resolvePolicyViolations(policy, cluster), // TODO: Use resolver.
            metadata: {
              ...parent.metadata,
              name: key,
            },
          };

          compliancePolicies[key] = { ...compliancePolicies[key], ...policyObject };
        });
      });
    }
    return Object.values(compliancePolicies);
  }

  static resolvePolicyFromStatus(aggregatedStatus, parent) {
    const compliancePolicies = [];
    Object.values(aggregatedStatus).forEach((cluster) => {
      Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
        const policy = parent.spec['runtime-rules'].find(p => p.metadata.name === key);

        const policyObject = {
          cluster: _.get(cluster, 'clustername', parent.metadata.namespace),
          complianceName: parent.metadata.name,
          complianceNamespace: parent.metadata.namespace,
          compliant: this.resolveStatus(value),
          enforcement: _.get(policy, 'spec.remediationAction', 'unknown'),
          message: _.get(value, 'message', '-'),
          name: key,
          rules: this.resolvePolicyRules(policy), // TODO: Use resolver.
          status: this.resolveStatus(value),
          valid: this.resolveValid(value),
          violations: this.resolvePolicyViolations(policy, cluster), // TODO: Use resolver.
          roleTemplates: this.resolvePolicyTemplates(policy, 'role-templates'),
          roleBindingTemplates: this.resolvePolicyTemplates(policy, 'roleBinding-templates'),
          objectTemplates: this.resolvePolicyTemplates(policy, 'object-templates'),
          detail: this.resolvePolicyDetails(policy),
          raw: policy,
          metadata: {
            ...parent.metadata,
            name: key,
          },
        };

        compliancePolicies.push(policyObject);
      });
    });

    const tempResult = {};
    Object.values(compliancePolicies).forEach((policy) => {
      if (!tempResult[policy.name]) {
        tempResult[policy.name] = {
          name: _.get(policy, 'name'),
          complianceName: _.get(policy, 'complianceName'),
          complianceNamespace: _.get(policy, 'complianceNamespace'),
          clusterCompliant: [],
          clusterNotCompliant: [],
          policies: [],
        };
      }
      tempResult[policy.name].policies.push(policy);
      if (_.get(policy, 'compliant', '').toLowerCase() === 'compliant') {
        tempResult[policy.name].clusterCompliant.push(_.get(policy, 'cluster'));
      } else {
        tempResult[policy.name].clusterNotCompliant.push(_.get(policy, 'cluster'));
      }
    });
    return Object.values(tempResult);
  }


  static resolvePolicyFromSpec(parent) {
    const compliancePolicies = [];
    const policies = _.get(parent, 'spec.runtime-rules', []);
    policies.forEach((policy) => {
      compliancePolicies.push({
        name: _.get(policy, 'metadata.name'),
        complianceName: _.get(parent, 'metadata.name'),
        complianceNamespace: _.get(parent, 'metadata.namespace'),
      });
    });
    return Object.values(compliancePolicies);
  }

  static resolveStatus(parent) {
    return _.get(parent, 'Compliant') || _.get(parent, 'compliant', 'unknown');
  }

  static resolveValid(parent) {
    if (_.get(parent, 'Valid') !== undefined) {
      return _.get(parent, 'Valid') ? true : 'invalid';
    }
    if (_.get(parent, 'valid') !== undefined) {
      return _.get(parent, 'valid') ? true : 'invalid';
    }
    return 'unknown';
  }

  static resolveComplianceStatus(parent) {
    const complianceStatus = [];
    Object.entries(_.get(parent, 'status.status', {})).forEach(([clusterName, perClusterStatus]) => {
      const aggregatedStatus = _.get(perClusterStatus, 'aggregatePoliciesStatus', {});

      // get compliant status per cluster
      if (aggregatedStatus) {
        let validNum = 0;
        let compliantNum = 0;
        let policyNum = 0;
        Object.values(aggregatedStatus).forEach((object) => {
          if (this.resolveStatus(object) === 'Compliant') compliantNum += 1;
          if (this.resolveValid(object)) validNum += 1;
          policyNum += 1;
        });
        complianceStatus.push({
          clusterNamespace: clusterName,
          localCompliantStatus: `${compliantNum}/${policyNum}`,
          localValidStatus: `${validNum}/${policyNum}`,
        });
      }
    });

    return complianceStatus;
  }


  static resolvePolicyCompliant({ status = {} }) {
    let totalPolicies = 0;
    let compliantPolicies = 0;

    Object.values(status.status || []).forEach((cluster) => {
      Object.values(cluster.aggregatePoliciesStatus || {}).forEach((policyValue) => {
        totalPolicies += 1;
        if (this.resolveStatus(policyValue).toLowerCase() === 'compliant') compliantPolicies += 1;
      });
    });

    return `${compliantPolicies}/${totalPolicies}`;
  }


  static resolveClusterCompliant({ status = {} }) {
    if (status && status.status) {
      const totalClusters = Object.keys(status.status).length;
      const compliantClusters = Object.values(status.status || []).filter(cluster => (_.get(cluster, 'compliant', '').toLowerCase() === 'compliant'));
      return `${compliantClusters.length}/${totalClusters}`;
    }
    return '0/0';
  }

  async getPlacementPolicies(parent = {}) {
    const policies = _.get(parent, 'status.placementPolicies', []);
    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementpolicies`,
      { kind: 'PlacementPolicy' },
    );
    const map = new Map();
    if (response) {
      response.forEach(item => map.set(item.metadata.name, item));
    }
    const placementPolicies = [];
    policies.forEach((policy) => {
      const pp = map.get(policy);
      if (pp) {
        const spec = pp.spec || {};
        placementPolicies.push({
          clusterLabels: spec.clusterLabels,
          metadata: pp.metadata,
          raw: pp,
          clusterReplicas: spec.clusterReplicas,
          resourceSelector: spec.resourceHint,
          status: pp.status,
        });
      }
    });
    return placementPolicies;
  }

  async getPlacementBindings(parent = {}) {
    const bindings = _.get(parent, 'status.placementBindings', []);
    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementbindings`,
      { kind: 'PlacementBinding' },
    );
    const map = new Map();
    if (response) {
      response.forEach(item => map.set(item.metadata.name, item));
    }
    const placementBindings = [];

    bindings.forEach((binding) => {
      const pb = map.get(binding);
      if (pb) {
        placementBindings.push({
          metadata: pb.metadata,
          raw: pb,
          placementRef: pb.placementRef,
          subjects: pb.subjects,
        });
      }
    });
    return placementBindings;
  }

  async getPolicies(name, namespace, clusterName) {
    // if policy name specified
    if (name !== undefined) {
      const response = await this.kubeConnector.resourceViewQuery('policy', clusterName, name, namespace, null, false).catch(() => null);
      const results = _.get(response, 'status.results');
      if (results) {
        const item = _.get(results, `${clusterName}`, {});
        if (item) {
          const result = [];
          item.items.forEach(policy => result.push({ ...policy, raw: policy }));
          return result;
        }
      }
    }
    return [];
  }


  static resolvePolicyDetails(parent) {
    return {
      exclude_namespace: _.get(parent, 'spec.namespaces.exclude', ['*']),
      include_namespace: _.get(parent, 'spec.namespaces.include', ['*']),
    };
  }

  static resolvePolicyEnforcement(parent) {
    return _.get(parent, 'spec.remediationAction', 'unknown');
  }

  static resolvePolicyRules(parent) {
    const rules = [];
    getTemplates(parent).forEach((res) => {
      if (res.rules) {
        Object.entries(res.rules).forEach(([key, rul]) => {
          const complianceType = _.get(rul, 'complianceType');
          if (complianceType) {
            const rule = {
              complianceType,
              apiGroups: _.get(rul, 'policyRule.apiGroups', ['-']),
              resources: _.get(rul, 'policyRule.resources', ['-']),
              verbs: _.get(rul, 'policyRule.verbs', ['-']),
              templateType: _.get(res, 'templateType', ''),
              ruleUID: `${_.get(res, 'metadata.name', '-')}-rule-${key}`,
            };
            rules.push(rule);
          }
        });
      }
    });
    return rules;
  }

  static resolveRoleSubjects(parent) {
    let roleSubjects = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === 'roleBinding-templates') {
        roleSubjects = [..._.get(res, 'roleBinding.subjects', [])];
      }
    });
    return roleSubjects;
  }

  static resolveRoleRef(parent) {
    const roleRef = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === 'roleBinding-templates') {
        roleRef.push(_.get(res, 'roleBinding.roleRef', {}));
      }
    });
    return roleRef;
  }

  static resolvePolicyStatus(parent) {
    if (_.get(parent, 'status.Compliant') || _.get(parent, 'status.compliant')) {
      return _.get(parent, 'status.Compliant') || _.get(parent, 'status.compliant');
    }
    if (_.get(parent, 'status.Valid') !== undefined) {
      return _.get(parent, 'status.Valid') ? 'valid' : 'invalid';
    }
    if (_.get(parent, 'status.valid') !== undefined) {
      return _.get(parent, 'status.valid') ? 'valid' : 'invalid';
    }
    return 'unknown';
  }

  static resolvePolicyMessage(parent) {
    return _.get(parent, 'status.message', '-');
  }

  static resolvePolicyTemplates(parent, type) {
    const tempArray = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === type) {
        if (type === 'roleBinding-templates') {
          tempArray.push({
            name: _.get(res, 'roleBinding.metadata.name', '-'),
            lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'roleBinding.apiVersion', ''),
            compliant: _.get(res, 'status.Compliant', ''),
            validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
            raw: res,
          });
        } else if (type === 'object-templates') {
          tempArray.push({
            name: _.get(res, 'objectDefinition.metadata.name', '-'),
            lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'objectDefinition.apiVersion', ''),
            kind: _.get(res, 'objectDefinition.kind', ''),
            compliant: _.get(res, 'status.Compliant', ''),
            status: _.get(res, 'status.Compliant', ''),
            validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
            raw: res,
          });
        } else {
          tempArray.push({
            name: _.get(res, 'metadata.name', '-'),
            lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'apiVersion', ''),
            compliant: _.get(res, 'status.Compliant', ''),
            status: _.get(res, 'status.Compliant', ''),
            validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
            raw: res,
          });
        }
      }
    });
    return tempArray;
  }

  static resolvePolicyViolations(parent, cluster) {
    const violationArray = [];
    getTemplates(parent).forEach((res) => {
      _.get(res, 'status.conditions').forEach((templateCondition) => {
        if (_.get(templateCondition, 'type').toLowerCase() === 'violation') {
          violationArray.push({
            name: ['object-templates', 'policy-templates'].includes(_.get(res, 'templateType'))
              ? _.get(res, 'objectDefinition.metadata.name', '-')
              : _.get(res, 'metadata.name', '-'),
            cluster: _.get(cluster, 'clustername', '-'),
            status: this.resolvePolicyStatus(res),
            message: (templateCondition && _.get(templateCondition, 'message', '-')) || '-',
            reason: (templateCondition && _.get(templateCondition, 'reason', '-')) || '-',
            selector: _.get(res, 'selector', ''),
          });
        }
      });
    });
    return violationArray;
  }
}
