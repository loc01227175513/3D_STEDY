import React from 'react';
import { useAuthStore } from '@/apollo/stores/useAuthStore';
import { useLogoutMutation } from '@/graphql/mutations/logout.generated';
import { handleLogout } from '@/utils/auth';
import { SvgIconComponent } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface UserProfileItemProps {
  item: {
    icon: SvgIconComponent | React.ElementType | string;
    title: string;
    email?: string;
    path?: string;
    sx?: SxProps<Theme>;
    sxIcon?: SxProps<Theme>;
    sxText?: SxProps<Theme>;
    sxArrow?: SxProps<Theme>;
  };
  ToastMessage: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const UserProfileItem: React.FC<UserProfileItemProps> = ({ item, ToastMessage }) => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [logoutMutation] = useLogoutMutation();

  const onLogout = async () => {
    await handleLogout(
      // Convert Apollo mutation to a promise-based function
      (variables) => {
        return new Promise((resolve, reject) => {
          logoutMutation({
            variables,
            onCompleted: (data) => resolve({ success: Boolean(data.logout) }),
            onError: (error) => reject(error),
          });
        });
      },
      {
        setUser,
        navigate: (path: number | string) => {
          if (typeof path === 'number') {
            navigate(path);
          } else {
            navigate(path);
          }
        },
        ToastMessage,
      }
    );
  };

  return (
    <>
      <ListItem
        component="div"
        onClick={onLogout}
        sx={{
          py: 1.5,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
          },
          ...item.sx,
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'rgba(0, 0, 0, 0.54)', ...item.sxIcon }}>
          {typeof item.icon === 'string' ? (
            <img src={item.icon} alt={item.title} style={{ width: 24, height: 24 }} />
          ) : (
            React.createElement(item.icon)
          )}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          secondary={item.email}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem',
              fontWeight: 500,
            },
            ...item.sxText,
          }}
        />
        {item.sxArrow && <ChevronRightIcon sx={{ color: '#666', fontSize: 20, ml: 1, ...item.sxArrow }} />}
      </ListItem>
    </>
  );
};

export default UserProfileItem;
