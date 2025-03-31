import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
}));

const SearchCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const RouteCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

interface Route {
  id: number;
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');

  const featuredRoutes: Route[] = [
    {
      id: 1,
      from: 'Gwalior',
      to: 'Nagpur',
      duration: '4h 30m',
      price: '450 rs',
      image: 'https://source.unsplash.com/random/800x600/?bus',
    },
    {
      id: 2,
      from: 'Jhansi',
      to: 'Delhi',
      duration: '6h 15m',
      price: '650 rs',
      image: 'https://source.unsplash.com/random/800x600/?travel',
    },
    {
      id: 3,
      from: 'Banglore',
      to: 'Mumbai',
      duration: '4h 45m',
      price: '940 rs',
      image: 'https://source.unsplash.com/random/800x600/?road',
    },
  ];

  const handleSearch = () => {
    if (fromLocation && toLocation && date) {
      navigate('/select-bus');
    }
  };

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to BRES
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your trusted partner for comfortable and reliable bus travel
          </Typography>
        </Container>
      </HeroSection>

      <Container>
        <SearchCard>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={fromLocation}
                  label="From"
                  onChange={(e) => setFromLocation(e.target.value)}
                >
                  <MenuItem value="new-york">New York</MenuItem>
                  <MenuItem value="los-angeles">Los Angeles</MenuItem>
                  <MenuItem value="chicago">Chicago</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={toLocation}
                  label="To"
                  onChange={(e) => setToLocation(e.target.value)}
                >
                  <MenuItem value="boston">Boston</MenuItem>
                  <MenuItem value="san-francisco">San Francisco</MenuItem>
                  <MenuItem value="detroit">Detroit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Search Buses
              </Button>
            </Grid>
          </Grid>
        </SearchCard>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
          Featured Routes
        </Typography>

        <Grid container spacing={4}>
          {featuredRoutes.map((route) => (
            <Grid item xs={12} md={4} key={route.id}>
              <RouteCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={route.image}
                  alt={`${route.from} to ${route.to}`}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {route.from} → {route.to}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{route.duration}</Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    {route.price}
                  </Typography>
                </CardContent>
              </RouteCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 