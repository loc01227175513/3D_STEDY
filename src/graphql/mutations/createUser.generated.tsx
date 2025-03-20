import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type CreateUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const CreateUserDocument = gql`
mutation createUser($email: String!, $name: String!, $password: String!) {
  createUser(email: $email, name: $name, password: $password) {
    id
    name
    email
    password
  }
}
`;

export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
