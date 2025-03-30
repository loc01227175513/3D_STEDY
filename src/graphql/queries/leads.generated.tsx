import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LeadsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterLeadInput>;
}>;

export type LeadsQueryResponse = { __typename?: 'Query' } & {
  leads: { __typename?: 'LeadPaginatedResponse' } & Pick<Types.LeadPaginatedResponse, 'total'> & {
      items: Array<
        { __typename?: 'Lead' } & Pick<
          Types.Lead,
          | 'address'
          | 'community'
          | 'consultant'
          | 'createdAt'
          | 'deletedAt'
          | 'email'
          | 'full_name'
          | 'home_specialist'
          | 'id'
          | 'lead_source'
          | 'phone'
          | 'productId'
          | 'sale_agent'
          | 'state'
          | 'status'
          | 'tenantId'
          | 'total_price'
          | 'updatedAt'
        > & {
            product?: Types.Maybe<
              { __typename?: 'Product' } & Pick<
                Types.Product,
                | 'SKU'
                | 'availableSizes'
                | 'brandName'
                | 'code'
                | 'communitiesId'
                | 'createdAt'
                | 'defaultSize'
                | 'deletedAt'
                | 'description'
                | 'enable'
                | 'id'
                | 'moduleType'
                | 'name'
                | 'note'
                | 'offset'
                | 'path'
                | 'position'
                | 'price'
                | 'serieIds'
                | 'storeIds'
                | 'thumbnail'
                | 'updatedAt'
              >
            >;
          }
      >;
    };
};

export const LeadsDocument = gql`
  query leads($filter: FilterLeadInput) {
    leads(filter: $filter) {
      items {
        address
        community
        consultant
        createdAt
        deletedAt
        email
        full_name
        home_specialist
        id
        lead_source
        phone
        product {
          SKU
          availableSizes
          brandName
          code
          communitiesId
          createdAt
          defaultSize
          deletedAt
          description
          enable
          id
          moduleType
          name
          note
          offset
          path
          position
          price
          serieIds
          storeIds
          thumbnail
          updatedAt
        }
        productId
        sale_agent
        state
        status
        tenantId
        total_price
        updatedAt
      }
      total
    }
  }
`;

export function useLeadsQuery(options?: Omit<Urql.UseQueryArgs<LeadsQueryVariables>, 'query'>) {
  return Urql.useQuery<LeadsQueryResponse, LeadsQueryVariables>({ query: LeadsDocument, ...options });
}
