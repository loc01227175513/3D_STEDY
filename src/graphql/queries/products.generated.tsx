import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProductsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterProductInput>;
}>;

export type ProductsQueryResponse = { __typename?: 'Query' } & {
  products: { __typename?: 'ProductPaginatedResponse' } & Pick<Types.ProductPaginatedResponse, 'total'> & {
      items: Array<
        { __typename?: 'Product' } & Pick<
          Types.Product,
          | 'id'
          | 'code'
          | 'name'
          | 'brandName'
          | 'path'
          | 'defaultSize'
          | 'price'
          | 'thumbnail'
          | 'communitiesId'
          | 'enable'
          | 'serieIds'
          | 'storeIds'
          | 'createdAt'
          | 'updatedAt'
          | 'deletedAt'
          | 'description'
          | 'position'
          | 'availableSizes'
          | 'note'
          | 'offset'
          | 'moduleType'
          | 'SKU'
        > & {
            communities?: Types.Maybe<
              { __typename?: 'Communities' } & Pick<
                Types.Communities,
                | 'id'
                | 'name'
                | 'state'
                | 'status'
                | 'thumbnail_url'
                | 'description'
                | 'deletedAt'
                | 'createdAt'
                | 'updatedAt'
              >
            >;
          }
      >;
    };
};

export const ProductsDocument = gql`
  query products($filter: FilterProductInput) {
    products(filter: $filter) {
      items {
        id
        code
        name
        brandName
        path
        defaultSize
        price
        thumbnail
        communitiesId
        communities {
          id
          name
          state
          status
          thumbnail_url
          description
          deletedAt
          createdAt
          updatedAt
        }
        enable
        serieIds
        storeIds
        createdAt
        updatedAt
        deletedAt
        description
        position
        availableSizes
        note
        offset
        moduleType
        SKU
      }
      total
    }
  }
`;

export function useProductsQuery(options?: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQueryResponse, ProductsQueryVariables>({ query: ProductsDocument, ...options });
}
