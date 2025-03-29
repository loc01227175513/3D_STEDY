import { SvgIconComponent } from '@mui/icons-material';

export type NavItem = {
  title: string;
  icon: SvgIconComponent;
};

export type PropsLayout = {
  children: React.JSX.Element;
};

export interface LoginFormValues {
  email: string;
  password: string;
}
