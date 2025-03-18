import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';



const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      {/* <Route path="/" element={<HomePage />} />
      <Route path="/:tenantId" element={<TenantPage />} />
      <Route path="/:tenantId/:storeId" element={<StorePage />} /> */}
    </Routes>
  </Router>
);

export default AppRouter;
