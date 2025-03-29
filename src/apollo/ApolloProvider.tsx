import React from 'react';
import { apolloClient } from '@/apollo/client';
import { ApolloProvider } from '@apollo/client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ClientApolloProvider({ children }: ApolloProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
