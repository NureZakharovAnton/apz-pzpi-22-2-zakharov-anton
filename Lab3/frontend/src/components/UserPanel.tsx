import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import JobsList from './UserPanelJobsList';
import MyProposals from './UserPanelMyProposals';
import ProfileSettings from './UserPanelProfileSettings';
import MyJobs from './UserPanelMyJobs';
import ReviewsList from './UserPanelReviewsList';
import PaymentsList from './UserPanelPaymentsList';

const drawerWidth = 220;

const navItems = [
  { label: 'Jobs', icon: <WorkIcon /> },
  { label: 'My Proposals', icon: <AssignmentIcon /> },
  { label: 'My Jobs', icon: <ListAltIcon /> },
  { label: 'Profile', icon: <PersonIcon /> },
  { label: 'Reviews', icon: <RateReviewIcon /> },
  { label: 'Payments', icon: <PaymentIcon /> },
];

export default function UserPanel() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            User Panel
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item, idx) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton selected={selected === idx} onClick={() => setSelected(idx)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '100vh' }}>
        <Toolbar />
        {selected === 0 && <JobsList />}
        {selected === 1 && <MyProposals />}
        {selected === 2 && <MyJobs />}
        {selected === 3 && <ProfileSettings />}
        {selected === 4 && <ReviewsList />}
        {selected === 5 && <PaymentsList />}
      </Box>
    </Box>
  );
} 