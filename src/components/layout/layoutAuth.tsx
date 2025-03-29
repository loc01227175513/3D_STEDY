import React from 'react';
import { Outlet } from 'react-router';

import { GuestGuard } from '@/components/auth';

export default function LayoutAuth(): React.JSX.Element {
  return (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  );
}
