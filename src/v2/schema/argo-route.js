/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { gql } from 'apollo-server-express';

export const typeDef = gql`
type argoRoute {
  namespace: String
}
`;

export const resolver = {
  Query: {
    argoRoute: (parent, args, { genericModel }) => genericModel.argoRoute(args),
  },
};
