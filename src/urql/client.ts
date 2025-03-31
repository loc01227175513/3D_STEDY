import { getAccessToken } from '@/utils/storage';
import { cacheExchange, createClient, fetchExchange } from 'urql';

const API_URL = `${import.meta.env.VITE_PUBLIC_API_DOMAIN || ''}${import.meta.env.VITE_PUBLIC_API_URL || ''}`;

// Configure urql client with authentication token and standard exchanges
export const urqlClient = createClient({
  url: API_URL,
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
