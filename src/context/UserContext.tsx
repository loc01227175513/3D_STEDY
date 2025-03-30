import React from 'react';
import requestNotificationPermission from '@/firebase/firebaseCreatePermission';
import { type UserFragmentFragment } from '@/graphql/fragments/user.generated';
import { MeDocument, MeQueryResponse, MeQueryVariables } from '@/graphql/queries/me.generated';
import { getAccessToken, removeAllToken } from '@/utils/storage';
import { useClient } from 'urql';

// Create a lazy version of the ME query
export const useMeLazyQuery = () => {
  const client = useClient();

  const executeQuery = async () => {
    return await client.query<MeQueryResponse, MeQueryVariables>(MeDocument, {}).toPromise();
  };

  return [executeQuery];
};

export interface UserContextValue {
  user: UserFragmentFragment | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>({
  user: null,
  error: null,
  isLoading: false,
});

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: UserFragmentFragment | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });
  const [me] = useMeLazyQuery();

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const token = getAccessToken();
      if (!token) {
        setState((prev) => ({
          ...prev,
          user: null,
          error: '',
          isLoading: false,
        }));

        return;
      }
      const { data: responseData, error } = await me();

      if (error || !responseData) {
        setState((prev) => ({
          ...prev,
          user: null,
          error: '',
          isLoading: false,
        }));

        removeAllToken();

        return;
      }

      setState((prev) => ({
        ...prev,
        user: responseData.me ?? null,
        error: null,
        isLoading: false,
      }));
    } catch (err) {
      console.log(err);

      setState((prev) => ({
        ...prev,
        user: null,
        error: 'Something went wrong',
        isLoading: false,
      }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch(() => {});
  }, [checkSession]);
  React.useEffect(() => {
    requestNotificationPermission();
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}
