import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';

import AnalyticsIcon from '/icons/Analytics.svg';
import CustomersIcon from '/icons/customers.svg';
import CommunitiesIcon from '/icons/dimensions.svg';
import FloorplansIcon from '/icons/Floorplans.svg';
import PersonIcon from '/icons/Leads.svg';
import StartNewDesignIcon from '/icons/NEWDESIGN.svg';
import SettingsIcon from '/icons/setting.svg';
import user from '/icons/user.svg';

export const icons = {
  dashboard: DashboardIcon,
  leads: PersonIcon,
  analytics: AnalyticsIcon,
  store: StoreIcon,
  Communities: CommunitiesIcon,
  Floorplans: FloorplansIcon,
  customers: CustomersIcon,
  user: user,
  startNewDesign: StartNewDesignIcon,
  setting: SettingsIcon,
} as const;

export type IconType = keyof typeof icons;
