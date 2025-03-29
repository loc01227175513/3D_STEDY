import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RefreshTokenMutationVariables = Types.Exact<{
  input: Types.RefreshTokenInput;
}>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: { __typename?: 'RefreshTokenResponse'; accessToken: string; refreshToken: string };
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
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
}
