import React from 'react';
import { SxProps, Tab, Tabs, Theme } from '@mui/material';

export interface StatusTabOption {
  value: number;
  label: string;
  statusValues?: string;
}

export interface StatusProps {
  tabValue: number;
  onTabChange: (tabValue: number, statusValues?: string) => void;
  tabOptions?: StatusTabOption[];
  tabStyles: {
    tabsContainer: SxProps<Theme>;
    tab: (isActive: boolean) => SxProps<Theme>;
    tabWithPadding: (isActive: boolean) => SxProps<Theme>;
  };
}

export const Status: React.FC<StatusProps> = ({
  tabValue,
  onTabChange,
  tabOptions = [
    { value: 0, label: 'All', statusValues: '' },
    { value: 1, label: 'Active', statusValues: 'New,Contacted,In Progress,Qualified' },
    { value: 2, label: 'Archive', statusValues: 'Closed,Unqualified' },
  ],
  tabStyles,
}) => {
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    // Find the statusValues for the selected tab
    const selectedTab = tabOptions.find((tab) => tab.value === newValue);
    onTabChange(newValue, selectedTab?.statusValues);
  };

  return (
    <Tabs value={tabValue} onChange={handleTabChange} sx={tabStyles.tabsContainer}>
      {tabOptions.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          sx={
            tab.value === 0 ? tabStyles.tab(tabValue === tab.value) : tabStyles.tabWithPadding(tabValue === tab.value)
          }
        />
      ))}
    </Tabs>
  );
};

export default Status;
