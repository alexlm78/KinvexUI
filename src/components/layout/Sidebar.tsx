import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  drawerWidth: number;
}

interface NavigationItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const navigationItems: NavigationItem[] = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'Productos',
    path: '/products',
    icon: <InventoryIcon />,
  },
  {
    text: 'Órdenes de Compra',
    path: '/orders',
    icon: <OrdersIcon />,
  },
  {
    text: 'Reportes',
    path: '/reports',
    icon: <ReportsIcon />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryIcon color="primary" />
          <Typography variant="h6" noWrap component="div" color="primary">
            Kinvex
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
