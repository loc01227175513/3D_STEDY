import React from 'react';
import { Provider } from 'urql';

import { urqlClient } from './client';

interface UrqlProviderProps {
  children: React.ReactNode;
}

export function UrqlProvider({ children }: UrqlProviderProps) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
