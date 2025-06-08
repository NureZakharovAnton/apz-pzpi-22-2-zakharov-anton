import { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import WorkIcon from '@mui/icons-material/Work';
import UsersDataGrid from './UsersDataGrid';
import ReviewsDataGrid from './ReviewsDataGrid';
import ProposalsDataGrid from './ProposalsDataGrid';
import PaymentsDataGrid from './PaymentsDataGrid';
import JobsDataGrid from './JobsDataGrid';

const drawerWidth = 220;

const navItems = [
  { label: 'Users', icon: <PeopleIcon /> },
  { label: 'Reviews', icon: <RateReviewIcon /> },
  { label: 'Proposals', icon: <DescriptionIcon /> },
  { label: 'Payments', icon: <PaymentIcon /> },
  { label: 'Jobs', icon: <WorkIcon /> },
];

function PlaceholderGrid({ label }: { label: string }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">{label} Data Grid (coming soon)</Typography>
    </Box>
  );
}

export default function AdminPanel() {
  const [selected, setSelected] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
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
        {selected === 0 && <UsersDataGrid />}
        {selected === 1 && <ReviewsDataGrid />}
        {selected === 2 && <ProposalsDataGrid />}
        {selected === 3 && <PaymentsDataGrid />}
        {selected === 4 && <JobsDataGrid />}
      </Box>
    </Box>
  );
} 