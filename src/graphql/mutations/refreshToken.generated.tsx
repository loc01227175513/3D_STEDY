import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RefreshTokenMutationVariables = Types.Exact<{
  input: Types.RefreshTokenInput;
}>;

export type RefreshTokenMutationResponse = { __typename?: 'Mutation' } & {
  refreshToken: { __typename?: 'RefreshTokenResponse' } & Pick<
    Types.RefreshTokenResponse,
    'accessToken' | 'refreshToken'
  >;
};

export const RefreshTokenDocument = gql`
  mutation refreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutationResponse, RefreshTokenMutationVariables>(RefreshTokenDocument);
}
