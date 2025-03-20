import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: 'Query' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const GetUsersDocument = gql`
query getUsers() {
    getUsers{
        id
        name
        email
        password
    }
}
`;

export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
