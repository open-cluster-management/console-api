/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

export const kubeSystem = {
  body: {
    kind: 'ClusterList',
    apiVersion: 'clusterregistry.k8s.io/v1alpha1',
    metadata: {
      selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/clusters',
      resourceVersion: '136667',
    },
    items: [
      {
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        metadata: {
          name: 'hub-cluster',
          namespace: 'kube-system',
          selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters/hub-cluster',
          uid: 'd9f3a5aa-9f19-11e8-855e-f2b998610544',
          resourceVersion: '136558',
          creationTimestamp: '2018-08-13T16:56:41Z',
          labels: {
            cloud: 'IBM',
            datacenter: 'raleigh',
            environment: 'Dev',
            name: 'hub-cluster',
            owner: 'development',
            region: 'US',
            vendor: 'ICP',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
          },
          finalizers: [
            'finalizer.hcm.ibm.com',
          ],
        },
        spec: {
          kubernetesApiEndpoints: {
            serverEndpoints: [
              {
                serverAddress: '9.42.80.212:8001',
              },
            ],
          },
          authInfo: {},
        },
        status: {
          conditions: [
            {
              type: 'OK',
              status: '',
              lastHeartbeatTime: '2018-08-15T19:41:20Z',
              lastTransitionTime: null,
            },
          ],
        },
      },
      {
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        metadata: {
          name: 'new-cluster',
          namespace: 'kube-system',
          selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters/new-cluster',
          uid: 'd9f3a6aa-9f19-11f8-855e-f2b908610543',
          resourceVersion: '137558',
          creationTimestamp: '2018-08-13T16:56:41Z',
          labels: {
            cloud: 'IBM',
            datacenter: 'raleigh',
            environment: 'Dev',
            name: 'new-cluster',
            owner: 'development',
            region: 'US',
            vendor: 'ICP',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
          },
          finalizers: [
            'finalizer.hcm.ibm.com',
          ],
        },
        spec: {
          kubernetesApiEndpoints: {
            serverEndpoints: [
              {
                serverAddress: '9.42.80.212:8001',
              },
            ],
          },
          authInfo: {},
        },
        status: {
          conditions: [
            {
              type: '',
              status: '',
              lastHeartbeatTime: '2018-08-15T19:41:20Z',
              lastTransitionTime: null,
            },
          ],
        },
      },
    ],
  },
};

export default {
  body: {
    kind: 'ClusterList',
    apiVersion: 'clusterregistry.k8s.io/v1alpha1',
    metadata: {
      selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/clusters',
      resourceVersion: '136667',
    },
    items: [
      {
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        metadata: {
          name: 'managed-cluster',
          namespace: 'default',
          selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters/mycluster.icp',
          uid: 'd9f3a5aa-9f19-11e8-855e-f2b998610544',
          resourceVersion: '136558',
          creationTimestamp: '2018-08-13T16:56:41Z',
          labels: {
            cloud: 'IBM',
            datacenter: 'toronto',
            environment: 'Dev',
            name: 'managed-cluster',
            owner: 'marketing',
            region: 'US',
            vendor: 'ICP',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
          },
          finalizers: [
            'finalizer.hcm.ibm.com',
          ],
        },
        spec: {
          kubernetesApiEndpoints: {
            serverEndpoints: [
              {
                serverAddress: '9.42.80.212:8001',
              },
            ],
          },
          authInfo: {},
        },
        status: {},
      },
    ],
  },
};
