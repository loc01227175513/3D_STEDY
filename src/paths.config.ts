import { styleDashboard, styleDashboardDown } from '@/common/style/styleDashboardDown';

import { icons } from './common/icon/icon';

export const paths = {
  home: '/',
  signIn: '/auth',
  signUp: '/auth/sign-up',
  forgotPassword: '/auth/forgot-password',
  logout: '/logout',
  dashboard: '/dashboard',
  analytic: '/dashboard/analytic',
  store: '/dashboard/stores',
  user: '/dashboard/users',
  setting: '/dashboard/setting',
  // Design paths
  floorplan: {
    path: '/',
    title: 'Back to Floorplan',
  },
  design: {
    external: {
      path: '/design/external',
      title: 'Back to Floorplan',
    },
    internal: {
      path: '/external-2d',
      title: 'Back to Internal',
    },
    designModel: {
      path: '/design',
      title: 'Back to Design Model',
    },
    checkoutBill: {
      path: '/checkout-bill',
      title: 'Bronte - Y03 / EXTERNAL / Kitchen',
    },
    virtual: {
      path: '/design/virtual',
      title: 'Back to Virtual',
    },
    productDetails: {
      design: {
        path: '/',
        title: 'Back to Overview',
      },
      floorplan: {
        path: '/',
        title: 'Back to Floorplan',
      },
    },
  },
} as const;

export const dashboard = {
  path: '/dashboard',
  title: 'Dashboard',
  children: {
    leads: {
      path: '/dashboard',
      title: 'Leads',
      icon: icons.leads,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
    projects: {
      path: '/dashboard/CommunitiesPage',
      title: 'Communities',
      icon: icons.Communities,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
    products: {
      path: '/dashboard/FloorPlanPage',
      title: 'Floorplans',
      icon: icons.Floorplans,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
    customers: {
      path: '/dashboard/CustomersPage',
      title: 'Customers',
      icon: icons.customers,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
    analytics: {
      path: '/dashboard/analytics',
      title: 'Analytics & Report',
      icon: icons.analytics,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
    users: {
      path: '/dashboard/users',
      title: 'Users',
      icon: icons.user,
      sx: styleDashboard.sxUsers,
      sxIcon: styleDashboard.sxUsersIcon,
      sxText: styleDashboard.sxUsersText,
    },
    settings: {
      path: '/dashboard/settings',
      title: 'Settings',
      icon: icons.setting,
      sx: styleDashboard.sx,
      sxIcon: styleDashboard.sxIcon,
      sxText: styleDashboard.sxText,
    },
  },
};
export const dashboardDown = {
  path: '/dashboard/down',
  title: 'Down',
  children: {
    setting: {
      path: '/dashboard/down/setting',
      title: 'START NEW DESIGN',
      icon: icons.startNewDesign,
      sx: styleDashboardDown.startNewDesign,
      sxIcon: styleDashboardDown.startNewDesignIcon,
      sxText: styleDashboardDown.startNewDesignText,
    },
    users: {
      path: '/dashboard/down/users',
      title: 'Admin User',
      email: 'admin@domain.com',
      icon: icons.user,
      sx: styleDashboardDown.sx,
      sxIcon: styleDashboardDown.sxIcon,
      sxText: styleDashboardDown.sxText,
      sxArrow: styleDashboardDown.sxArrow,
    },
  },
};
