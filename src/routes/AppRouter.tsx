import {
  AnalyticPage,
  AnalyticsPage,
  CategoryPage,
  CheckOutBill,
  CheckOutBillCustomer,
  CheckOutBillCustomerDetail,
  ClientApolloProvider,
  CommunitiesPage,
  CustomersPage,
  DashboardPage,
  DesignModel,
  DetailFloorPlan,
  EditCommunitiesPage,
  EditCustomerPage,
  EditFloorPlanPage,
  EditLeadPage,
  EditUserPage,
  External2D,
  FloorPlanPage,
  HomePage,
  LayoutAuth,
  LayoutCheckOutBill,
  LayoutDashboard,
  LayoutDesign,
  LayoutModeDesign,
  LayoutProductDetails,
  NotFound,
  React,
  Route,
  Router,
  Routes,
  SelectFloorPlan,
  SignInPage,
  SignUpPage,
  ToastContainer,
  UrqlProvider,
  UserPage,
  UserProvider,
} from './imports';

const AppRouter: React.FC = () => (
  <ClientApolloProvider>
    <UrqlProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-floorplan" element={<SelectFloorPlan />} />

            <Route path="/checkout-bill-customer" element={<CheckOutBillCustomer />} />
            <Route path="/checkout-bill-customer-detail" element={<CheckOutBillCustomerDetail />} />
            {/* Product Details */}
            <Route path="/product-details" element={<LayoutProductDetails />}>
              <Route index element={<DetailFloorPlan />} />
              <Route path="detail-floorplan" element={<DetailFloorPlan />} />
            </Route>
            <Route path="/external-2d" element={<LayoutDesign />}>
              <Route index element={<External2D />} />
              <Route path="external-2d" element={<External2D />} />
            </Route>
            <Route path="/design" element={<LayoutModeDesign />}>
              <Route index element={<DesignModel />} />
              <Route path="design" element={<DesignModel />} />
            </Route>
            <Route path="/checkout-bill" element={<LayoutCheckOutBill />}>
              <Route index element={<CheckOutBill />} />
              <Route path="checkout-bill" element={<CheckOutBill />} />
            </Route>

            {/* Auth */}
            <Route path="/auth" element={<LayoutAuth />}>
              <Route index element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Dashboard */}
            <Route path="/dashboard" element={<LayoutDashboard />}>
              <Route index element={<DashboardPage />} />
              <Route path="analytic" element={<AnalyticPage />} />
              <Route path="dashboard/edit" element={<EditLeadPage />} />
              <Route path="FloorPlanPage" element={<FloorPlanPage />} />
              <Route path="FloorPlanPage/edit" element={<EditFloorPlanPage />} />

              <Route path="CommunitiesPage" element={<CommunitiesPage />} />
              <Route path="CommunitiesPage/edit" element={<EditCommunitiesPage />} />

              <Route path="CustomersPage" element={<CustomersPage />} />
              <Route path="CustomersPage/edit" element={<EditCustomerPage />} />
              {/* <Route path="CustomersPage/edit" element={<EditCustomersPage />} /> */}
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="users/edit" element={<EditUserPage />} />
              <Route path="category" element={<CategoryPage />} />
            </Route>

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
      </UserProvider>
    </UrqlProvider>
  </ClientApolloProvider>
);

export default AppRouter;
