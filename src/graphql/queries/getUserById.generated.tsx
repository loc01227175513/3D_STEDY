import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetUserByIdQuery = { __typename?: 'Query' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const GetUserByIdDocument = gql`
query getUserById($id: Int!) {
  getUserById(id: $id) {
    id
    name
    email
    password
  }
}
`;

export function useGetUserByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options
  );
}
