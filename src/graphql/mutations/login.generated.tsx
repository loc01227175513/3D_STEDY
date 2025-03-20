import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const LoginDocument = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    name
    email
    password
  }
}
`;

export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
