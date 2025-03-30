import { gql } from '@urql/core';

import type * as Types from '../type.interface';

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  Types.User,
  'id' | 'email' | 'fullName' | 'createdAt' | 'updatedAt' | 'username'
> & { roles?: Types.Maybe<Array<{ __typename?: 'Role' } & Pick<Types.Role, 'id' | 'roleName' | 'capabilities'>>> };

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    email
    fullName
    roles {
      id
      roleName
      capabilities
    }
    createdAt
    updatedAt
    username
  }
`;
