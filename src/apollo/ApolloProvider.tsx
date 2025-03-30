import React from 'react';
import { apolloClient } from '@/apollo/client';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@/StyledEngineProvider';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ClientApolloProvider({ children }: ApolloProviderProps) {
  return (
    <StyledEngineProvider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </StyledEngineProvider>
  );
}
