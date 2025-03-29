import * as React from 'react';
import { UserContext, type UserContextValue } from '@/context/UserContext';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    console.log('useUser must be used within a UserProvider');
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
