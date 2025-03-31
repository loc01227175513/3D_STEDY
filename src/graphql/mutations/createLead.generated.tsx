import { gql } from '@urql/core';
import * as Urql from 'urql';

import type * as Types from '../type.interface';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateLeadMutationVariables = Types.Exact<{
  createLeadInput: Types.CreateLeadInput;
}>;

export type CreateLeadMutationResponse = { __typename?: 'Mutation' } & {
  createLead: { __typename?: 'Lead' } & Pick<
    Types.Lead,
    | 'address'
    | 'communityId'
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
      community?: Types.Maybe<
        { __typename?: 'Communities' } & Pick<
          Types.Communities,
          'createdAt' | 'deletedAt' | 'description' | 'id' | 'name' | 'state' | 'status' | 'thumbnail_url' | 'updatedAt'
        > & {
            categories: Array<
              { __typename?: 'Category' } & Pick<
                Types.Category,
                'createdAt' | 'deletedAt' | 'id' | 'name' | 'orderIdx' | 'tenantIds' | 'thumbnail' | 'updatedAt'
              >
            >;
          }
      >;
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
        > & {
            communities?: Types.Maybe<
              { __typename?: 'Communities' } & Pick<
                Types.Communities,
                | 'createdAt'
                | 'deletedAt'
                | 'description'
                | 'id'
                | 'name'
                | 'state'
                | 'status'
                | 'thumbnail_url'
                | 'updatedAt'
              >
            >;
          }
      >;
    };
};

export const CreateLeadDocument = gql`
  mutation createLead($createLeadInput: CreateLeadInput!) {
    createLead(createLeadInput: $createLeadInput) {
      address
      community {
        categories {
          createdAt
          deletedAt
          id
          name
          orderIdx
          tenantIds
          thumbnail
          updatedAt
        }
        createdAt
        deletedAt
        description
        id
        name
        state
        status
        thumbnail_url
        updatedAt
      }
      communityId
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
        communities {
          createdAt
          deletedAt
          description
          id
          name
          state
          status
          thumbnail_url
          updatedAt
        }
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
  }
`;

export function useCreateLeadMutation() {
  return Urql.useMutation<CreateLeadMutationResponse, CreateLeadMutationVariables>(CreateLeadDocument);
}
