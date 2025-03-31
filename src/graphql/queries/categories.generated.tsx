import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CategoriesQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterCategoryInput>;
}>;

export type CategoriesQueryResponse = { __typename?: 'Query' } & {
  categories: { __typename?: 'CategoryPaginatedResponse' } & Pick<Types.CategoryPaginatedResponse, 'total'> & {
      items: Array<
        { __typename?: 'Category' } & Pick<
          Types.Category,
          'id' | 'name' | 'thumbnail' | 'tenantIds' | 'orderIdx' | 'createdAt' | 'updatedAt' | 'deletedAt'
        > & {
            communities?: Types.Maybe<
              Array<
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
              >
            >;
          }
      >;
    };
};

export const CategoriesDocument = gql`
  query categories($filter: FilterCategoryInput) {
    categories(filter: $filter) {
      items {
        id
        name
        thumbnail
        tenantIds
        orderIdx
        createdAt
        updatedAt
        deletedAt
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
      }
      total
    }
  }
`;

export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQueryResponse, CategoriesQueryVariables>({ query: CategoriesDocument, ...options });
}
