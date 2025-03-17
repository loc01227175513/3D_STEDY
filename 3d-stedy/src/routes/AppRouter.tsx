import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorePage from '@/pages/StorePage';
import TenantPage from '@/pages/TenantPage';
import HomePage from '@/pages/HomePage';
import DomainRedirect from './DomainRedirect';

const AppRouter: React.FC = () => (
  <Router>
    <DomainRedirect />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:tenantId" element={<TenantPage />} />
      <Route path="/:tenantId/:storeId" element={<StorePage />} />
    </Routes>
  </Router>
);

export default AppRouter;
