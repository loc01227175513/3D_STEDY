import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      id: number;
      email: string;
      fullName: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
      roles?: Array<{
        __typename?: 'Role';
        id: number;
        roleName: string;
        capabilities: Array<string>;
        createdAt: Date;
        updatedAt: Date;
      }> | null;
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
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
