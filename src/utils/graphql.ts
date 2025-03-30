import { FilterParams } from '@/components/dashBoard/showFilter';

/**
 * Transforms FilterParams into GraphQL variables format
 * @param filterParams The filter parameters from DataGrid
 * @param defaultLimit Default limit to use if not provided in filterParams
 * @returns GraphQL variables object ready to use in queries
 */
export const buildGraphQLVariables = (filterParams: FilterParams, defaultLimit = 10) => {
  return {
    variables: {
      filter: {
        keyword: filterParams.keyword || undefined,
        status: filterParams.status || undefined,
        page: filterParams.page !== undefined ? filterParams.page + 1 : 1, // GraphQL uses 1-based indexing
        limit: filterParams.limit || defaultLimit,
        createFrom: filterParams.createFrom,
        createTo: filterParams.createTo,
      },
    },
  };
};
