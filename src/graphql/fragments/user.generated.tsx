import gql from 'graphql-tag';

export type UserFragmentFragment = {
  __typename?: 'User';
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  roles?: Array<{ __typename?: 'Role'; id: number; roleName: string; capabilities: Array<string> }> | null;
};

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
