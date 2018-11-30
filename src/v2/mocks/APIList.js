/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockResponse = {
  body: {
    paths: [
      '/api',
      '/api/v1',
      '/apis',
      '/apis/',
      '/apis/admissionregistration.k8s.io',
      '/apis/admissionregistration.k8s.io/v1alpha1',
      '/apis/admissionregistration.k8s.io/v1beta1',
      '/apis/apiextensions.k8s.io',
      '/apis/apiextensions.k8s.io/v1beta1',
      '/apis/apiregistration.k8s.io',
      '/apis/apiregistration.k8s.io/v1',
      '/apis/apiregistration.k8s.io/v1beta1',
      '/apis/apps',
      '/apis/apps/v1',
      '/apis/apps/v1beta1',
      '/apis/apps/v1beta2',
      '/apis/authentication.k8s.io',
      '/apis/authentication.k8s.io/v1',
      '/apis/authentication.k8s.io/v1beta1',
      '/apis/authorization.k8s.io',
      '/apis/authorization.k8s.io/v1',
      '/apis/authorization.k8s.io/v1beta1',
      '/apis/autoscaling',
      '/apis/autoscaling/v1',
      '/apis/autoscaling/v2beta1',
      '/apis/batch',
      '/apis/batch/v1',
      '/apis/batch/v1beta1',
      '/apis/batch/v2alpha1',
      '/apis/certificates.k8s.io',
      '/apis/certificates.k8s.io/v1beta1',
      '/apis/certmanager.k8s.io',
      '/apis/certmanager.k8s.io/v1alpha1',
      '/apis/clusterregistry.k8s.io',
      '/apis/clusterregistry.k8s.io/v1alpha1',
      '/apis/compliance.mcm.ibm.com',
      '/apis/compliance.mcm.ibm.com/v1alpha1',
      '/apis/custom.metrics.k8s.io',
      '/apis/custom.metrics.k8s.io/v1beta1',
      '/apis/events.k8s.io',
      '/apis/events.k8s.io/v1beta1',
      '/apis/extensions',
      '/apis/extensions/v1beta1',
      '/apis/icp.ibm.com',
      '/apis/icp.ibm.com/v1',
      '/apis/mcm.ibm.com',
      '/apis/mcm.ibm.com/v1alpha1',
      '/apis/metrics.k8s.io',
      '/apis/metrics.k8s.io/v1beta1',
      '/apis/networking.k8s.io',
      '/apis/networking.k8s.io/v1',
      '/apis/policy',
      '/apis/policy.mcm.ibm.com',
      '/apis/policy.mcm.ibm.com/v1alpha1',
      '/apis/policy/v1beta1',
      '/apis/rbac.authorization.k8s.io',
      '/apis/rbac.authorization.k8s.io/v1',
      '/apis/rbac.authorization.k8s.io/v1beta1',
      '/apis/scheduling.k8s.io',
      '/apis/scheduling.k8s.io/v1beta1',
      '/apis/securityenforcement.admission.cloud.ibm.com',
      '/apis/securityenforcement.admission.cloud.ibm.com/v1beta1',
      '/apis/servicecatalog.k8s.io',
      '/apis/servicecatalog.k8s.io/v1beta1',
      '/apis/storage.k8s.io',
      '/apis/storage.k8s.io/v1',
      '/apis/storage.k8s.io/v1beta1',
      '/healthz',
      '/healthz/autoregister-completion',
      '/healthz/etcd',
      '/healthz/ping',
      '/healthz/poststarthook/apiservice-openapi-controller',
      '/healthz/poststarthook/apiservice-registration-controller',
      '/healthz/poststarthook/apiservice-status-available-controller',
      '/healthz/poststarthook/bootstrap-controller',
      '/healthz/poststarthook/ca-registration',
      '/healthz/poststarthook/generic-apiserver-start-informers',
      '/healthz/poststarthook/kube-apiserver-autoregistration',
      '/healthz/poststarthook/rbac/bootstrap-roles',
      '/healthz/poststarthook/scheduling/bootstrap-system-priority-classes',
      '/healthz/poststarthook/start-apiextensions-controllers',
      '/healthz/poststarthook/start-apiextensions-informers',
      '/healthz/poststarthook/start-kube-aggregator-informers',
      '/healthz/poststarthook/start-kube-apiserver-admission-initializer',
      '/healthz/poststarthook/start-kube-apiserver-informers',
      '/logs',
      '/metrics',
      '/openapi/v2',
      '/swagger-2.0.0.json',
      '/swagger-2.0.0.pb-v1',
      '/swagger-2.0.0.pb-v1.gz',
      '/swagger.json',
      '/swaggerapi',
      '/version',
    ],
  },
};

export const apiPath = {
  body: {
    kind: 'APIResourceList',
    apiVersion: 'v1',
    groupVersion: 'mcm.ibm.com/v1alpha1',
    resources: [
      {
        name: 'applicationrelationships',
        singularName: '',
        namespaced: true,
        kind: 'ApplicationRelationship',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
        shortNames: [
          'rel',
        ],
      },
      {
        name: 'applicationrelationships/status',
        singularName: '',
        namespaced: true,
        kind: 'ApplicationRelationship',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'applications',
        singularName: '',
        namespaced: true,
        kind: 'Application',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'applications/status',
        singularName: '',
        namespaced: true,
        kind: 'Application',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'clusterjoinrequests',
        singularName: '',
        namespaced: false,
        kind: 'ClusterJoinRequest',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'clusterjoinrequests/status',
        singularName: '',
        namespaced: false,
        kind: 'ClusterJoinRequest',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'clusterstatuses',
        singularName: '',
        namespaced: true,
        kind: 'ClusterStatus',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'clusterstatuses/topology',
        singularName: '',
        namespaced: true,
        kind: 'ClusterStatusTopology',
        verbs: [
          'create',
        ],
      },
      {
        name: 'deployableoverrides',
        singularName: '',
        namespaced: true,
        kind: 'DeployableOverride',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
        shortNames: [
          'do',
        ],
      },
      {
        name: 'deployableoverrides/status',
        singularName: '',
        namespaced: true,
        kind: 'DeployableOverride',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'deployables',
        singularName: '',
        namespaced: true,
        kind: 'Deployable',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'deployables/status',
        singularName: '',
        namespaced: true,
        kind: 'Deployable',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'helmrepos',
        singularName: '',
        namespaced: true,
        kind: 'HelmRepo',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'helmrepos/status',
        singularName: '',
        namespaced: true,
        kind: 'HelmRepo',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'placementbindings',
        singularName: '',
        namespaced: true,
        kind: 'PlacementBinding',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
        shortNames: [
          'pb',
        ],
      },
      {
        name: 'placementpolicies',
        singularName: '',
        namespaced: true,
        kind: 'PlacementPolicy',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
        shortNames: [
          'pp',
        ],
      },
      {
        name: 'placementpolicies/status',
        singularName: '',
        namespaced: true,
        kind: 'PlacementPolicy',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'resourceviews',
        singularName: '',
        namespaced: true,
        kind: 'ResourceView',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'resourceviews/status',
        singularName: '',
        namespaced: true,
        kind: 'ResourceView',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'works',
        singularName: '',
        namespaced: true,
        kind: 'Work',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'works/result',
        singularName: '',
        namespaced: true,
        kind: 'ResourceViewResult',
        verbs: [
          'create',
        ],
      },
      {
        name: 'works/status',
        singularName: '',
        namespaced: true,
        kind: 'Work',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
      {
        name: 'worksets',
        singularName: '',
        namespaced: true,
        kind: 'WorkSet',
        verbs: [
          'create',
          'delete',
          'deletecollection',
          'get',
          'list',
          'patch',
          'update',
          'watch',
        ],
      },
      {
        name: 'worksets/status',
        singularName: '',
        namespaced: true,
        kind: 'WorkSet',
        verbs: [
          'get',
          'patch',
          'update',
        ],
      },
    ],
  },
};

