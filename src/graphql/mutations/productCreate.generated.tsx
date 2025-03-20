import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type ProductCreateMutationVariables = Types.Exact<{
  product: Types.ProductCreateInput;
}>;

export type ProductCreateMutation = { __typename?: 'Mutation' } & { /* TODO: Điền kiểu trả về chính xác */ };

export const ProductCreateDocument = gql`
mutation productCreate($product: ProductCreateInput!) {
  productCreate(product: $product) {
    product {
      id
      title
      price
      description
      image
      options {
        id
        name
        position
        optionValues {
          id
          name
          hasVariants
        }
      }
      createdAt
      updatedAt
    }
    userErrors {
      message
      field
    }
  }
}
`;

export function useProductCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProductCreateMutation,
    ProductCreateMutationVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<ProductCreateMutation, ProductCreateMutationVariables>(
    ProductCreateDocument,
    options
  );
}
