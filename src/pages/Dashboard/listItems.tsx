import {
  TuneRounded,
  Workspaces,
  People,
  Dashboard,
  Logout,
} from '@mui/icons-material';
import DashboardView from '../../views/DashboardView';

export const NavItems: {
  id: string;
  icon: JSX.Element;
  text: string;
  view: JSX.Element;
  onClick?: () => void;
}[] = [
  {
    id: 'dashboard',
    icon: <Dashboard />,
    text: 'Dashboard',
    view: <DashboardView />,
  },
  {
    id: 'tests',
    icon: <Workspaces />,
    text: 'Tests',
    view: <div>Tests</div>,
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

export const NavUserItems: {
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

export default NavItems;
