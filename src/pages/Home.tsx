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
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedIcon from '@mui/icons-material/Bed';
import EventSeatIcon from '@mui/icons-material/EventSeat';
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
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const FilterSection = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

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
    {
      id: 4,
      from: 'Calcutta',
      to: 'Chennai',
      duration: '7h 30m',
      price: '1200 rs',
      image: 'https://source.unsplash.com/random/800x600/?city',
    },
    {
      id: 5,
      from: 'Dharwad',
      to: 'Bangalore',
      duration: '5h 45m',
      price: '750 rs',
      image: 'https://source.unsplash.com/random/800x600/?landscape',
    },
    {
      id: 6,
      from: 'Jaipur',
      to: 'Delhi',
      duration: '5h 15m',
      price: '850 rs',
      image: 'https://source.unsplash.com/random/800x600/?architecture',
    },
    {
      id: 7,
      from: 'Hyderabad',
      to: 'Chennai',
      duration: '6h 30m',
      price: '950 rs',
      image: 'https://source.unsplash.com/random/800x600/?urban',
    },
    {
      id: 8,
      from: 'Pune',
      to: 'Mumbai',
      duration: '3h 45m',
      price: '550 rs',
      image: 'https://source.unsplash.com/random/800x600/?transport',
    },
  ];

  const busTypes = [
    { id: 'ac', label: 'AC', icon: <AcUnitIcon /> },
    { id: 'non-ac', label: 'Non-AC', icon: <WbSunnyIcon /> },
    { id: 'sleeper', label: 'Sleeper', icon: <BedIcon /> },
    { id: 'seater', label: 'Seater', icon: <EventSeatIcon /> },
  ];

  const timeSlots = [
    { id: 'early-morning', label: 'Early Morning (12 AM - 6 AM)', icon: <AccessTimeIcon /> },
    { id: 'morning', label: 'Morning (6 AM - 12 PM)', icon: <AccessTimeIcon /> },
    { id: 'afternoon', label: 'Afternoon (12 PM - 6 PM)', icon: <AccessTimeIcon /> },
    { id: 'evening', label: 'Evening (6 PM - 12 AM)', icon: <AccessTimeIcon /> },
  ];

  const handleSearch = () => {
    if (fromLocation && toLocation && date) {
      navigate('/select-bus');
    }
  };

  const handleBusTypeChange = (busType: string) => {
    setSelectedBusTypes(prev =>
      prev.includes(busType)
        ? prev.filter(type => type !== busType)
        : [...prev, busType]
    );
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(timeSlot)
        ? prev.filter(slot => slot !== timeSlot)
        : [...prev, timeSlot]
    );
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
                  <MenuItem value="gwalior">Gwalior</MenuItem>
                  <MenuItem value="jhansi">Jhansi</MenuItem>
                  <MenuItem value="bangalore">Bangalore</MenuItem>
                  <MenuItem value="calcutta">Calcutta</MenuItem>
                  <MenuItem value="dharwad">Dharwad</MenuItem>
                  <MenuItem value="jaipur">Jaipur</MenuItem>
                  <MenuItem value="hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="pune">Pune</MenuItem>
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
                  <MenuItem value="nagpur">Nagpur</MenuItem>
                  <MenuItem value="delhi">Delhi</MenuItem>
                  <MenuItem value="mumbai">Mumbai</MenuItem>
                  <MenuItem value="chennai">Chennai</MenuItem>
                  <MenuItem value="bangalore">Bangalore</MenuItem>
                  <MenuItem value="jaipur">Jaipur</MenuItem>
                  <MenuItem value="hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="pune">Pune</MenuItem>
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

        <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Featured Routes
            </Typography>
            <Grid container spacing={4}>
              {featuredRoutes.map((route) => (
                <Grid item xs={12} md={6} key={route.id}>
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
          </Box>

          <Box sx={{ width: 300 }}>
            <FilterSection>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Filter Options
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>Price Range (₹)</Typography>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={2000}
                    step={100}
                    marks={[
                      { value: 0, label: '₹0' },
                      { value: 1000, label: '₹1000' },
                      { value: 2000, label: '₹2000' },
                    ]}
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
                <Box>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>Bus Type</Typography>
                  <FormGroup>
                    {busTypes.map((type) => (
                      <FormControlLabel
                        key={type.id}
                        control={
                          <Checkbox
                            checked={selectedBusTypes.includes(type.id)}
                            onChange={() => handleBusTypeChange(type.id)}
                            icon={type.icon}
                            sx={{ color: 'primary.main' }}
                          />
                        }
                        label={type.label}
                      />
                    ))}
                  </FormGroup>
                </Box>
                <Box>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>Departure Time</Typography>
                  <FormGroup>
                    {timeSlots.map((slot) => (
                      <FormControlLabel
                        key={slot.id}
                        control={
                          <Checkbox
                            checked={selectedTimeSlots.includes(slot.id)}
                            onChange={() => handleTimeSlotChange(slot.id)}
                            icon={slot.icon}
                            sx={{ color: 'primary.main' }}
                          />
                        }
                        label={slot.label}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Box>
            </FilterSection>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 