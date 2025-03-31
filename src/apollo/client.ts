import {
  RefreshTokenDocument,
  RefreshTokenMutationResponse,
  RefreshTokenMutationVariables,
} from '@/graphql/mutations/refreshToken.generated';
import { paths } from '@/paths.config';
import { getAccessToken, getRefreshToken, removeAllToken, saveAccessToken, saveRefreshToken } from '@/utils/storage';
import { ApolloClient, from, fromPromise, HttpLink, InMemoryCache, split, type Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from 'apollo-utilities';
import { createClient } from 'graphql-ws';

// Lấy URL từ biến môi trường
const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_PUBLIC_API_DOMAIN || ''}${import.meta.env.VITE_PUBLIC_API_URL || ''}`,
  includeExtensions: true,
});

const API_URL = `${import.meta.env.VITE_PUBLIC_API_DOMAIN || ''}${import.meta.env.VITE_PUBLIC_API_URL || ''}`;
const wsUrl = API_URL.replace(/^https?/, 'wss');

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken() || '';
  if (token === '') {
    return {
      headers: {
        ...headers,
      },
    };
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const refreshTokenLink = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    window.location.replace(paths.signIn);
    return '';
  }
  try {
    const res = await apolloClient.mutate<RefreshTokenMutationResponse, RefreshTokenMutationVariables>({
      mutation: RefreshTokenDocument,
      variables: {
        input: { refreshToken },
      },
    });

    if (res.data?.refreshToken) {
      const accessToken = res.data.refreshToken.accessToken || '';
      const newRefreshToken = res.data.refreshToken.refreshToken || '';
      saveAccessToken(accessToken);
      saveRefreshToken(newRefreshToken);
      restartWebsockets();
      return accessToken;
    }
    removeAllToken();
    window.location.replace('/sign-in');
    return '';
  } catch (error) {
    console.log(error);
    removeAllToken();
    window.location.replace(paths.signIn);
    return '';
  }
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0];

    switch (extensions?.code) {
      case 'UNAUTHENTICATED': {
        // case 'INTERNAL_SERVER_ERROR': // case 'invalid_token': // case 'FORBIDDEN':
        let forward$: Observable<string | void | boolean>;
        let isRefreshing = false;
        let pendingRequests: (() => void)[] = [];
        const resolvePendingRequests = () => {
          pendingRequests.map((callback) => callback());
          pendingRequests = [];
        };
        if (!isRefreshing) {
          isRefreshing = true;

          forward$ = fromPromise(
            refreshTokenLink()
              .then((newAccessToken) => {
                if (!newAccessToken) {
                  window.location.replace(paths.signIn);
                  return '';
                }
                const oldHeaders = operation.getContext().headers;
                operation.setContext(() => {
                  return {
                    headers: {
                      ...oldHeaders,
                      authorization: newAccessToken ? `Bearer ${newAccessToken}` : '',
                    },
                  };
                });
                resolvePendingRequests();
                return newAccessToken;
              })
              .catch(() => {
                pendingRequests = [];
              })
              .finally(() => {
                isRefreshing = false;
              })
          );
        } else {
          forward$ = fromPromise(
            new Promise((resolve) => {
              pendingRequests.push(() => resolve(true));
            })
          );
        }
        return forward$.flatMap(() => forward(operation));
      }
    }
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    connectionParams: () => {
      const token = getAccessToken() || '';
      if (!token) {
        wsClient.dispose();
        return {};
      }
      return {
        authorization: `Bearer ${token}`,
      };
    },
    shouldRetry: () => true,
    retryAttempts: Infinity,
    on: {},
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  from([authLink, httpLink])
);

export const apolloClient = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
let wsClient: ReturnType<typeof createClient>; // Thêm biến global để lưu client

export const restartWebsockets = () => {
  if (wsClient) {
    wsClient.dispose(); // Hủy client cũ
  }
  wsClient = createClient({
    url: wsUrl,
    connectionParams: () => ({
      headers: {
        authorization: `Bearer ${getAccessToken() || ''}`,
      },
    }),
  });
};

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
