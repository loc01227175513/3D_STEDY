import { getAccessToken } from '@/utils/storage';
import { GRAPHQL_URL } from '@/utils/apiConfig';
import { cacheExchange, createClient, fetchExchange } from 'urql';

// Configure urql client with authentication token and standard exchanges
export const urqlClient = createClient({
  url: GRAPHQL_URL,
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
  exchanges: [cacheExchange, fetchExchange],
});
