import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutationResponse = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResponse' } & Pick<Types.LoginResponse, 'accessToken' | 'refreshToken'> & {
      user: { __typename?: 'User' } & Pick<
        Types.User,
        'id' | 'email' | 'fullName' | 'username' | 'createdAt' | 'updatedAt'
      > & {
          roles?: Types.Maybe<
            Array<
              { __typename?: 'Role' } & Pick<Types.Role, 'id' | 'roleName' | 'capabilities' | 'createdAt' | 'updatedAt'>
            >
          >;
        };
    };
};

export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        fullName
        username
        createdAt
        updatedAt
        roles {
          id
          roleName
          capabilities
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutationResponse, LoginMutationVariables>(LoginDocument);
}
