import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveLeadsMutationVariables = Types.Exact<{
  leadIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;

export type RemoveLeadsMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'removeLeads'>;

export const RemoveLeadsDocument = gql`
  mutation removeLeads($leadIds: [ID!]!) {
    removeLeads(leadIds: $leadIds)
  }
`;

export function useRemoveLeadsMutation() {
  return Urql.useMutation<RemoveLeadsMutationResponse, RemoveLeadsMutationVariables>(RemoveLeadsDocument);
}
