import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Theme, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  background: 'rgba(26, 35, 126, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const Logo = styled(Typography)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const HomeButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  color: 'white',
  margin: '0 8px',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '80%' : '0%',
    height: '2px',
    background: 'white',
    transition: 'all 0.2s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&::after': {
      width: '80%',
    },
  },
  ...(active && {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }),
}));

const AuthButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  marginLeft: '10px',
  padding: '8px 20px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthModalOpen = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <LogoContainer>
              <Logo variant="h6" onClick={() => navigate('/')}>
                <DirectionsBusIcon sx={{ mr: 1, fontSize: '2rem' }} />
                BRES
              </Logo>
              <HomeButton
                onClick={() => navigate('/')}
                size="large"
                aria-label="home"
              >
                <HomeIcon />
              </HomeButton>
            </LogoContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NavButton
                startIcon={<LocationOnIcon />}
                onClick={() => navigate('/track-bus')}
                active={isActive('/track-bus')}
              >
                Track Bus
              </NavButton>
              <NavButton
                startIcon={<AccessTimeIcon />}
                onClick={() => navigate('/book-ticket')}
                active={isActive('/book-ticket')}
              >
                Schedule
              </NavButton>
              <NavButton
                startIcon={<DirectionsBusIcon />}
                onClick={() => navigate('/book-ticket')}
                active={isActive('/book-ticket')}
              >
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
        </Container>
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