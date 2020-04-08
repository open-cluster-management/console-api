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
    kind: 'ClusterStatusList',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/clusterstatuses',
      resourceVersion: '11543',
    },
    items: [
      {
        metadata: {
          name: 'hub-cluster',
          namespace: 'kube-system',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/mycluster/clusterstatuses/mycluster',
          uid: 'a83b98b7-b03e-11e8-bd43-b69970856045',
          resourceVersion: '723',
          creationTimestamp: '2018-09-04T12:32:59Z',
          labels: {
            cloud: 'IBM',
            datacenter: 'toronto',
            environment: 'Dev',
            name: 'hub-cluster',
            owner: 'marketing',
            region: 'US',
            vendor: 'ICP',
          },
          annotations: {
            'mcm.ibm.com/deployer-prefix': 'md',
            'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOm15Y2x1c3RlcjpteWNsdXN0ZXI=',
          },
        },
        spec: {
          masterAddresses: [
            {
              ip: '9.42.23.230',
            },
          ],
          capacity: {
            cpu: '16',
            memory: '32013Mi',
            nodes: '3',
            storage: '80Gi',
          },
          usage: {
            cpu: '6598m',
            memory: '6728Mi',
            pods: '5071',
            storage: '60Gi',
          },
          monitoringEndpoint: {
            ip: '9.42.23.230',
            hostname: 'mycluster.prometheus.icp',
          },
          monitoringSecretRef: {
            name: 'cluster-prometheus-secret',
          },
          kluterletVersion: '3.1.0-rc1.1+5d3ffb594d62d7-dirty',
        },
      },
      {
        metadata: {
          name: 'new-cluster',
          namespace: 'kube-system',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/kube-system/clusterstatuses/new-cluster',
          uid: 'a83b98b7-b03e-11e8-bd43-b69970856045',
          resourceVersion: '723',
          creationTimestamp: '2018-09-04T12:32:59Z',
          labels: {
            cloud: 'IBM',
            datacenter: 'toronto',
            environment: 'Dev',
            name: 'new-cluster',
            owner: 'marketing',
            region: 'US',
            vendor: 'ICP',
          },
          annotations: {
            'mcm.ibm.com/deployer-prefix': 'md',
            'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOm15Y2x1c3RlcjpteWNsdXN0ZXI=',
          },
        },
        spec: {
          masterAddresses: [
            {
              ip: '9.42.23.230',
            },
          ],
          capacity: {
            cpu: '16',
            memory: '32013Mi',
            nodes: '4',
            storage: '80Gi',
          },
          usage: {
            cpu: '7483m',
            memory: '5390Mi',
            pods: '5031',
            storage: '63Gi',
          },
          monitoringEndpoint: {
            ip: '9.42.23.230',
            hostname: 'mycluster.prometheus.icp',
          },
          monitoringSecretRef: {
            name: 'cluster-prometheus-secret',
          },
          kluterletVersion: '3.1.0-rc1.1+5d3ffb594d62d7-dirty',
        },
      },
    ],
  },
};

export default {
  body: {
    kind: 'ClusterStatusList',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/clusterstatuses',
      resourceVersion: '11543',
    },
    items: [
      {
        metadata: {
          name: 'managed-cluster',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/mycluster/clusterstatuses/mycluster',
          uid: 'a83b98b7-b03e-11e8-bd43-b69970856045',
          resourceVersion: '723',
          creationTimestamp: '2018-09-04T12:32:59Z',
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
            'mcm.ibm.com/deployer-prefix': 'md',
            'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOm15Y2x1c3RlcjpteWNsdXN0ZXI=',
          },
        },
        spec: {
          masterAddresses: [
            {
              ip: '9.42.23.230',
            },
          ],
          capacity: {
            cpu: '18',
            memory: '32013Mi',
            nodes: '2',
            storage: '100Gi',
          },
          usage: {
            cpu: '6598m',
            memory: '6728Mi',
            pods: '5071',
            storage: '60Gi',
          },
          monitoringEndpoint: {
            ip: '9.42.23.230',
            hostname: 'mycluster.prometheus.icp',
          },
          monitoringSecretRef: {
            name: 'cluster-prometheus-secret',
          },
          kluterletVersion: '3.1.0-rc1.1+5d3ffb594d62d7-dirty',
        },
      },
    ],
  },
};
