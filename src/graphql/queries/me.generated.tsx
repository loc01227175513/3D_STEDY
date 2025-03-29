import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import { UserFragmentFragmentDoc } from '../fragments/user.generated';
import * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    roles?: Array<{ __typename?: 'Role'; id: number; roleName: string; capabilities: Array<string> }> | null;
  };
};

export const MeDocument = gql`
  query me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useMeQuery(options?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const defaultOptions = {} as const;
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, { ...defaultOptions, ...options });
}

export function useMeLazyQuery(options?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const defaultOptions = {} as const;
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, { ...defaultOptions, ...options });
}
