import React from 'react';
import * as icons from '@mui/icons-material';

// This function provides a safe way to import MUI icons
// It fixes the "default is not exported" error by checking various ways the icon might be exported
export function getIcon(iconName: string) {
  if (!iconName) return null;
  
  // Get the icon from the icons object
  const Icon = (icons as any)[iconName];
  
  // Handle different export scenarios
  if (!Icon) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }
  
  // If it's a function, it's likely the icon component itself
  if (typeof Icon === 'function') {
    return Icon;
  }
  
  // If it has a default property that's a function, use that
  if (Icon.default && typeof Icon.default === 'function') {
    return Icon.default;
  }
  
  // If all else fails, return null
  console.warn(`Icon ${iconName} found but not a valid component`);
  return null;
}

// Icon wrapper component to safely render MUI icons
export function SafeIcon({ name, ...props }: { name: string, [key: string]: any }) {
  const IconComponent = getIcon(name);
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent {...props} />;
} 