import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  background: 'rgba(26, 35, 126, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  margin: '0 10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const AuthButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthModalOpen = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
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
            <AuthButton onClick={() => handleAuthModalOpen('login')}>
              Login
            </AuthButton>
            <AuthButton onClick={() => handleAuthModalOpen('signup')}>
              Sign Up
            </AuthButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <AuthModal
        open={authModalOpen}
        onClose={handleAuthModalClose}
        mode={authMode}
      />
    </>
  );
};

export default Navbar; 