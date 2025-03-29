import React, { useEffect } from 'react';
import { Loading } from '@/common/loading/Loading';
import { paths } from '@/paths.config';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';

interface propAuth {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: propAuth): React.JSX.Element => {
  const { user, error, isLoading } = useUser();
  const navigate = useNavigate();

  const checkAuth = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error || !user) {
      navigate(paths.signIn);
      return;
    }
  };

  useEffect(() => {
    checkAuth();
  }, [user, error, isLoading]);

  if (isLoading) {
    return <Loading fullScreen message="Please wait..." />;
  }

  if (user === null) {
    return <Loading fullScreen message="Please wait..." />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
