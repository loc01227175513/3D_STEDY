import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LogoutMutationVariables = Types.Exact<{
  input: Types.LogoutInput;
}>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export const LogoutDocument = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input)
  }
`;

export function useLogoutMutation() {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
