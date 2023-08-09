import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  Logout,
  People,
  TuneRounded,
  Workspaces,
} from '@mui/icons-material';
import DashboardView from '../../views/DashboardView';

import useUser from '@/hooks/useUser';
import NotFound from '../NotFound';
import Tests from '@/views/Tests';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.

export default function Dashboard() {
  const user = useUser();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const NavItems: {
    id: string;
    icon: JSX.Element;
    text: string;
    view: JSX.Element;
    onClick?: () => void;
  }[] = [
    {
      id: 'dashboard',
      icon: <DashboardIcon />,
      text: 'Dashboard',
      view: <DashboardView />,
    },
    {
      id: 'tests',
      icon: <Workspaces />,
      text: 'Tests',
      view: <Tests />,
    },
    {
      id: 'profile',
      icon: <People />,
      text: 'Profile',
      view: <div>Profile</div>,
    },
    {
      id: 'settings',
      icon: <TuneRounded />,
      text: 'Settings',
      view: <div>Settings</div>,
    },
  ];

  const NavUserItems: {
    id: string;
    icon: JSX.Element;
    text: string;
    view?: JSX.Element;
    onClick?: () => void;
  }[] = [
    {
      id: 'logout',
      icon: <Logout />,
      text: 'Logout',
      onClick: () => {
        window.location.href = '/';
      },
    },
  ];

  const [activeViewId, setActiveViewID] = useState('dashboard');
  const activeViewItem = NavItems.find((item) => item.id === activeViewId);

  function viewChangeHandler(event: React.MouseEvent<HTMLDivElement>) {
    const { id } = event.currentTarget;
    setActiveViewID(id);
  }

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  return !user ? (
    <NotFound />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {activeViewItem?.text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" className="flex flex-col justify-between h-full">
          <>
            <div>
              {NavItems.map((item) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events

                <ListItemButton
                  key={item.id}
                  id={item.id}
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={viewChangeHandler}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
              <Divider />
            </div>
            <div className="pb-4">
              {NavUserItems.map((item) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events

                <ListItemButton
                  key={item.id}
                  id={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      if (item.id === 'logout') {
                        user.logout();
                      }
                      item.onClick();
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </div>
          </>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {activeViewItem?.view}
        </Container>
      </Box>
    </Box>
  );
}
