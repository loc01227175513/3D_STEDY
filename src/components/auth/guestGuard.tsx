import * as React from 'react';
import { Loading } from '@/common/loading/Loading';
import { paths } from '@/paths.config';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const navigate = useNavigate();

  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      navigate(paths.dashboard);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
  }, [user, error, isLoading]);

  if (isChecking) {
    return <Loading />;
  }
  // console.log(error);

  // if (error) {
  //   return <Alert color="error">{error}</Alert>;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}
