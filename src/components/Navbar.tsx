import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: '#1a237e',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  margin: '0 10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <DirectionsBusIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BRES
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavButton startIcon={<LocationOnIcon />} onClick={() => navigate('/track-bus')}>
            Track Bus
          </NavButton>
          <NavButton startIcon={<AccessTimeIcon />}>Schedule</NavButton>
          <NavButton startIcon={<DirectionsBusIcon />} onClick={() => navigate('/select-bus')}>
            Book Ticket
          </NavButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 