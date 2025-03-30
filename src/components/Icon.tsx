import React from 'react';
import { SvgIconProps } from '@mui/material';
import { getIcon, SafeIcon } from '../utils/iconHelper';

export interface IconProps extends SvgIconProps {
  icon: string;
}

/**
 * A safe wrapper for MUI icons that handles import errors
 * This ensures all icons work properly regardless of how they're exported
 */
const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  if (!icon) return null;
  
  return <SafeIcon name={icon} {...props} />;
};

/**
 * Pre-registered icons that are commonly used
 * This ensures we only need to import each icon once
 */
export const KnownIcons = {
  // Navigation icons
  ArrowBack: getIcon('ArrowBack'),
  ArrowDropDown: getIcon('ArrowDropDown'),
  ChevronLeft: getIcon('ChevronLeft'),
  ChevronRight: getIcon('ChevronRight'),
  Close: getIcon('Close'),
  Dashboard: getIcon('Dashboard'),
  ExpandMore: getIcon('ExpandMore'),
  FirstPage: getIcon('FirstPage'),
  Home: getIcon('Home'),
  KeyboardArrowDown: getIcon('KeyboardArrowDown'),
  KeyboardArrowRight: getIcon('KeyboardArrowRight'),
  LastPage: getIcon('LastPage'),
  MoreVert: getIcon('MoreVert'),
  NavigateNext: getIcon('NavigateNext'),
  
  // Action icons
  Add: getIcon('Add'),
  Delete: getIcon('Delete'),
  FilterList: getIcon('FilterList'),
  Search: getIcon('Search'),
  Visibility: getIcon('Visibility'),
  
  // Design icons
  VrPano: getIcon('Vrpano'),
  ViewInAr: getIcon('ViewInAr'),
  ViewList: getIcon('ViewList'),
  ViewModule: getIcon('ViewModule'),
  
  // Other common icons
  Store: getIcon('Store'),
  FileDownloadOutlined: getIcon('FileDownloadOutlined'),
  Description: getIcon('Description'),
  Send: getIcon('Send'),
  
  // Specialized icons
  AcUnit: getIcon('AcUnit'),
  BedroomParent: getIcon('BedroomParent'),
  CarRental: getIcon('CarRental'),
  CheckCircle: getIcon('CheckCircle'),
  Construction: getIcon('Construction'),
  Countertops: getIcon('Countertops'),
  DragHandle: getIcon('DragHandle'),
  Fence: getIcon('Fence'),
  KingBed: getIcon('KingBed'),
  Kitchen: getIcon('Kitchen'),
  LocalParking: getIcon('LocalParking'),
  PersonAdd: getIcon('PersonAdd'),
  SettingsPhone: getIcon('SettingsPhone'),
  SolarPower: getIcon('SolarPower'),
  SquareFoot: getIcon('SquareFoot'),
  Water: getIcon('Water'),
};

export default Icon; 