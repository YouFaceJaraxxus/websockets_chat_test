import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import {
  LogoIcon,
  HomeIcon,
  TransactionIcon,
  UsersIcon,
  KnowledgeIcon,
  ArchiveIcon,
  Account,
  Logout,
} from '../../assets/icons/index';
import {
  HOME_PATH,
  TRANSACTIONS_PATH,
  USERS_PATH,
  KNOWLEDGE_PATH,
  ARCHIVE_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
} from '../../routes/path-constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  logoutUserAsync,
  selectUser,
} from '../../features/Auth/slices/authSlice';
import { LogoHolderStyled } from './drawerStyle';
import { resetNotifications } from '../../features/UserHeader/models/notification/notificationsSlice';

const drawerWidth = 250;

export default function ResponsiveDrawer() {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const location = useLocation();
  const activeLocation = location.pathname.replace('/', '');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAdmin } = user;
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const adminMenu = [
    {
      name: t('sidebar-menu.home'),
      icon: <HomeIcon />,
      link: HOME_PATH,
      active: 'dashboard',
    },
    {
      name: t('sidebar-menu.transactions'),
      icon: <TransactionIcon />,
      link: TRANSACTIONS_PATH,
      active: 'transactions',
    },
    {
      name: t('sidebar-menu.users'),
      icon: <UsersIcon />,
      link: USERS_PATH,
      active: 'users',
    },
    {
      name: t('sidebar-menu.knowledge'),
      icon: <KnowledgeIcon />,
      link: KNOWLEDGE_PATH,
      active: 'knowledge',
    },
    {
      name: t('sidebar-menu.task-archive'),
      icon: <ArchiveIcon />,
      link: ARCHIVE_PATH,
      active: 'archive',
    },
  ];

  const userMenu = user.failedPayment ? [] : [
    {
      name: t('sidebar-menu.home'),
      icon: <HomeIcon />,
      link: HOME_PATH,
      active: 'dashboard',
    },
  ];

  const menuAccountLogout = [
    {
      name: t('sidebar-menu.my-account'),
      icon: <Account />,
      link: ACCOUNT_PATH,
      active: 'account',
    },
    {
      name: t('sidebar-menu.logout'),
      icon: <Logout />,
      link: LOGIN_PATH,
      active: 'logout',
    },
  ];

  const logoutUserClick = () => {
    dispatch(logoutUserAsync());
    dispatch(resetNotifications());
  };

  const drawer = (
    <div className="drawerHolder">
      <LogoHolderStyled>
        <LogoIcon />
      </LogoHolderStyled>
      <Divider />
      <List>
        {isAdmin ? (
          <>
            {adminMenu.map((item) => (
              <Link
                to={{ pathname: item.link }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem
                  button
                  key={item.name}
                  selected={activeLocation === item.active}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
          </>
        ) : (
          <>
            {userMenu.map((item) => (
              <Link
                to={{ pathname: item.link }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem
                  button
                  key={item.name}
                  selected={activeLocation === item.active}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
          </>
        )}
      </List>
      <List sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <Divider />
        {menuAccountLogout.map((item) => (
          item.link === LOGIN_PATH ?
            (
              <ListItem
                button
                key={item.name}
                selected={activeLocation === item.active}
                onClick={() => {
                  logoutUserClick();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ) :
            (
              <Link
                to={{ pathname: item.link }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem
                  button
                  key={item.name}
                  selected={activeLocation === item.active}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            )
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        '@media (max-width: 900px)': {
          '& > button': {
            marginTop: '16px',
          },
        },
      }}
    >
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          position: 'absolute',
          left: '3.5%',
          display: { md: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
