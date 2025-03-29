import React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from '@/components/auth/authGuard';

import { SelectFloorPlan } from '../../routes/imports';

export default function HomePage(): React.JSX.Element {
  return (
    <AuthGuard>
      <SelectFloorPlan />

      <Outlet />
    </AuthGuard>
  );
}
