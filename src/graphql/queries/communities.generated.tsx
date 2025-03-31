import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CommunitiesQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterCommunityInput>;
}>;

export type CommunitiesQueryResponse = { __typename?: 'Query' } & {
  communities: { __typename?: 'CommunitiesPaginatedResponse' } & Pick<Types.CommunitiesPaginatedResponse, 'total'> & {
      items: Array<
        { __typename?: 'Communities' } & Pick<
          Types.Communities,
          'id' | 'name' | 'state' | 'status' | 'thumbnail_url' | 'description' | 'deletedAt' | 'createdAt' | 'updatedAt'
        > & {
            categories: Array<
              { __typename?: 'Category' } & Pick<
                Types.Category,
                'id' | 'name' | 'thumbnail' | 'tenantIds' | 'orderIdx' | 'createdAt' | 'updatedAt' | 'deletedAt'
              >
            >;
          }
      >;
    };
};

export const CommunitiesDocument = gql`
  query communities($filter: FilterCommunityInput) {
    communities(filter: $filter) {
      items {
        id
        name
        state
        status
        thumbnail_url
        description
        categories {
          id
          name
          thumbnail
          tenantIds
          orderIdx
          createdAt
          updatedAt
          deletedAt
        }
        deletedAt
        createdAt
        updatedAt
      }
      total
    }
  }
`;

export function useCommunitiesQuery(options?: Omit<Urql.UseQueryArgs<CommunitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<CommunitiesQueryResponse, CommunitiesQueryVariables>({ query: CommunitiesDocument, ...options });
}
