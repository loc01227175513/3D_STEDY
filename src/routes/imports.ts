// React and Router
export { default as React } from 'react';
export { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Apollo and Context
export { ClientApolloProvider } from '@/apollo/ApolloProvider';
export { UrqlProvider } from '@/urql/Provider';
export { UserProvider } from '@/context/UserContext';

// Components
export { ToastContainer } from 'react-toastify';
export { default as LayoutAuth } from '@/components/layout/layoutAuth';
export { default as LayoutDashboard } from '@/components/layout/layoutDashboard';
export { default as LayoutProductDetails } from '@/components/layout/layoutProductDetails';
export { default as LayoutDesign } from '@/components/layout/layoutDesign';

// Pages
export { default as SignInPage } from '@/pages/auth/signIn';
export { default as SignUpPage } from '@/pages/auth/signUp';
export { default as AnalyticPage } from '@/pages/cms/analytic';
export { default as DashboardPage } from '@/pages/cms/dashboard';
export { default as HomePage } from '@/pages/home/home';
export { default as NotFound } from '@/pages/notFound';
export { default as DetailFloorPlan } from '@/pages/public/detailFloorPlan';
export { default as SelectFloorPlan } from '@/pages/public/selectFloorPlan';
export { default as External2D } from '@/pages/public/external2D';
export { default as DesignModel } from '@/pages/public/designModel';
export { default as LayoutModeDesign } from '@/components/layout/layoutModeDesign';
export { default as LayoutCheckOutBill } from '@/components/layout/layoutCheckOutBill';
export { default as CheckOutBill } from '@/pages/public/checkOutBill';
export { default as CheckOutBillCustomer } from '@/pages/public/checkOutBillCustomer';
export { default as CheckOutBillCustomerDetail } from '@/pages/public/checkOutBillCustomerDetail';
export { default as FloorPlanPage } from '@/pages/cms/public/floorPlan';
export { default as EditFloorPlanPage } from '@/pages/cms/public/editPage/editFloorPlan';
export { default as EditCommunitiesPage } from '@/pages/cms/public/editPage/editCommunities';
export { default as CommunitiesPage } from '@/pages/cms/public/communities';
export { default as AnalyticsPage } from '@/pages/cms/analytic';
export { default as UserPage } from '@/pages/cms/public-2/user';
export { default as EditCustomerPage } from '@/pages/cms/public/editPage/editCustomers';
export { default as EditUserPage } from '@/pages/cms/public/editPage/editUser';
export { default as CategoryPage } from '@/pages/cms/public/category';
export { default as CustomersPage } from '@/pages/cms/public/customers';
export { default as EditLeadPage } from '@/pages/cms/public/editPage/editLead';
export { default as AddLeadPage } from '@/pages/cms/public/addPage/addLead';
