import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LogoutMutationVariables = Types.Exact<{
  input: Types.LogoutInput;
}>;

export type LogoutMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'logout'>;

export const LogoutDocument = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input)
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutationResponse, LogoutMutationVariables>(LogoutDocument);
}
