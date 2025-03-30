import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQueryResponse = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    Types.User,
    'accessToken' | 'createdAt' | 'email' | 'fullName' | 'id' | 'password' | 'refreshToken' | 'updatedAt' | 'username'
  > & {
      roles?: Types.Maybe<
        Array<
          { __typename?: 'Role' } & Pick<Types.Role, 'capabilities' | 'createdAt' | 'id' | 'roleName' | 'updatedAt'>
        >
      >;
    };
};

export const MeDocument = gql`
  query me {
    me {
      accessToken
      createdAt
      email
      fullName
      id
      password
      refreshToken
      roles {
        capabilities
        createdAt
        id
        roleName
        updatedAt
      }
      updatedAt
      username
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQueryResponse, MeQueryVariables>({ query: MeDocument, ...options });
}
