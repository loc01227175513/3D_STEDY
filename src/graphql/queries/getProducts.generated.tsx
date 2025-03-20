import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type GetProductsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetProductsQuery = { __typename?: 'Query' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const GetProductsDocument = gql`
query getProducts() {
    getProducts{
        id
        title
        price
        description
        image
        createdAt
        updatedAt
    }
}
`;

export function useGetProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
