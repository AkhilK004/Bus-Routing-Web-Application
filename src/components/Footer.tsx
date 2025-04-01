import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: 'linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FooterTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -8,
    width: '40px',
    height: '2px',
    background: 'white',
  },
}));

const FooterLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: 'white',
    transform: 'translateX(5px)',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const Footer = () => {
  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai' },
    { from: 'Bangalore', to: 'Chennai' },
    { from: 'Kolkata', to: 'Hyderabad' },
    { from: 'Pune', to: 'Ahmedabad' },
  ];

  const popularCities = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
  ];

  const popularOperators = [
    'Volvo Express',
    'Luxury Travels',
    'Premium Bus',
    'Comfort Coach',
    'Royal Express',
    'Elite Travels',
  ];

  return (
    <FooterWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DirectionsBusIcon sx={{ fontSize: '2.5rem', mr: 1 }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  BRES
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                Your trusted partner for comfortable and reliable bus travel. We connect you to your destination with safety, comfort, and convenience.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <SocialIcon size="small">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon size="small">
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon size="small">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon size="small">
                  <LinkedInIcon />
                </SocialIcon>
              </Box>
            </FooterSection>
          </Grid>

          {/* Popular Routes */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle>Popular Routes</FooterTitle>
              {popularRoutes.map((route, index) => (
                <FooterLink key={index} href="#">
                  {route.from} → {route.to}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Popular Cities */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle>Popular Cities</FooterTitle>
              {popularCities.map((city, index) => (
                <FooterLink key={index} href="#">
                  {city}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Popular Operators */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle>Bus Operators</FooterTitle>
              {popularOperators.map((operator, index) => (
                <FooterLink key={index} href="#">
                  {operator}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* About BRES */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle>About BRES</FooterTitle>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            © 2024 BRES. All rights reserved.
          </Typography>
          <Box>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)', mr: 2, cursor: 'pointer', '&:hover': { color: 'white' } }}
            >
              Terms of Service
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer', '&:hover': { color: 'white' } }}
            >
              Privacy Policy
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 