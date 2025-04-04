import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  Paper,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: 'linear-gradient(180deg, #B4D5F5 0%, #D6E7F7 100%)',
  minHeight: '400px',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(20),
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'url("/images/city-skyline.svg") repeat-x bottom center',
    backgroundSize: 'contain',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'url("/images/mountains.svg") repeat-x bottom center',
    backgroundSize: 'contain',
    zIndex: 2,
  },
}));

const SearchCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
  position: 'relative',
  zIndex: 3,
}));

const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F8F9FA',
    borderRadius: theme.spacing(1),
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SwapButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: 32,
  height: 32,
  position: 'absolute',
  right: -16,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
}));

interface OfferCardProps {
  image?: string;
}

const OfferCard = styled(Card)<OfferCardProps>(({ theme, image }) => ({
  minWidth: 300,
  height: '180px',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
  '& .MuiCardContent-root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 1,
  },
}));

const OffersContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollBehavior: 'smooth',
}));

const ScrollButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const OperatorCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  width: 150,
  height: 150,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  padding: theme.spacing(3),
  backgroundColor: '#FFFFFF',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[4],
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const offersContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleOperatorClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const offers = [
    {
      id: 1,
      title: 'Catch The Action LIVE',
      description: 'Cricket League',
      code: 'ABHICRICKET',
      image: '/images/cricket-offer.svg',
      bgColor: '#F9E4D4',
      textColor: '#D85B53',
    },
    {
      id: 2,
      title: 'Travelling for a Wedding?',
      description: 'Upto ₹500 off on bus bookings',
      code: 'WEDDINGS',
      image: '/images/wedding-offer.svg',
      bgColor: '#E8F0FB',
      textColor: '#1A237E',
    },
    {
      id: 3,
      title: 'Save Upto ₹300',
      description: 'on APSRTC bookings',
      code: 'APSRTC',
      image: '/images/apsrtc-offer.svg',
      bgColor: '#FFE8E6',
      textColor: '#D85B53',
    },
    {
      id: 4,
      title: 'Save Upto ₹300',
      description: 'on TGSRTC bookings',
      code: 'TGSRTC',
      image: '/images/tgsrtc-offer.svg',
      bgColor: '#E6F4EA',
      textColor: '#1A237E',
    },
  ];

  const operators = [
    { id: 1, name: 'Volvo Buses', logo: '/images/volvo-logo.svg' },
    { id: 2, name: 'Luxury Travels', logo: '/images/luxury-logo.svg' },
    { id: 3, name: 'Royal Cruiser', logo: '/images/royal-logo.svg' },
    { id: 4, name: 'Green Line', logo: '/images/greenline-logo.svg' },
    { id: 5, name: 'Orange Tours', logo: '/images/orange-logo.svg' },
    { id: 6, name: 'City Express', logo: '/images/city-logo.svg' },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (offersContainerRef.current) {
      const scrollAmount = 320;
      const scrollPosition = direction === 'left' 
        ? offersContainerRef.current.scrollLeft - scrollAmount
        : offersContainerRef.current.scrollLeft + scrollAmount;
      offersContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1A237E', fontWeight: 500 }}>
            Book Bus Tickets
          </Typography>
          <SearchCard>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
                <StyledTextField
                  fullWidth
                  placeholder="From Station"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsBusIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <SwapButton onClick={handleSwapLocations}>
                  <SwapHorizIcon />
                </SwapButton>
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledTextField
                  fullWidth
                  placeholder="To Station"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <StyledTextField
                  fullWidth
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={1}>
                <Button
                  variant="contained"
                  color="inherit"
                  fullWidth
                  sx={{ 
                    bgcolor: '#F0F2F5',
                    color: '#1A237E',
                    '&:hover': {
                      bgcolor: '#E0E3E7',
                    }
                  }}
                >
                  Today
                </Button>
              </Grid>
              <Grid item xs={6} md={1}>
                <Button
                  variant="contained"
                  color="inherit"
                  fullWidth
                  sx={{ 
                    bgcolor: '#F0F2F5',
                    color: '#1A237E',
                    '&:hover': {
                      bgcolor: '#E0E3E7',
                    }
                  }}
                >
                  Tomorrow
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/book-ticket')}
                  sx={{
                    bgcolor: '#D85B53',
                    '&:hover': {
                      bgcolor: '#C24F47',
                    }
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </SearchCard>
        </Container>
      </HeroSection>

      {/* Offers Section */}
      <Container sx={{ mt: -10, position: 'relative', zIndex: 3 }}>
        <Box position="relative">
          <ScrollButton
            onClick={() => handleScroll('left')}
            sx={{ left: -20 }}
          >
            <ChevronLeftIcon />
          </ScrollButton>
          <OffersContainer ref={offersContainerRef}>
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                image={offer.image}
                sx={{ backgroundColor: offer.bgColor }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: offer.textColor, fontWeight: 600 }}>
                    {offer.title}
                  </Typography>
                  <Box>
                    <Typography variant="body1" sx={{ color: offer.textColor }}>
                      {offer.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: offer.textColor, opacity: 0.8 }}>
                      Use code: {offer.code}
                    </Typography>
                  </Box>
                </CardContent>
              </OfferCard>
            ))}
          </OffersContainer>
          <ScrollButton
            onClick={() => handleScroll('right')}
            sx={{ right: -20 }}
          >
            <ChevronRightIcon />
          </ScrollButton>
        </Box>
      </Container>

      {/* Operators Section */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1A237E', mb: 4 }}>
          Our Bus Partners
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {operators.map((operator) => (
            <Grid item key={operator.id}>
              <OperatorCard onClick={handleOperatorClick}>
                <img src={operator.logo} alt={operator.name} />
              </OperatorCard>
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                {operator.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose BRES Section */}
      <Container sx={{ my: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 500,
            color: '#1A237E',
            mb: 2
          }}>
            Why Choose BRES for Bus Ticket Booking?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ 
            mb: 4,
            maxWidth: 800,
            mx: 'auto'
          }}>
            BRES is India's fastest growing online ticket booking platform. BRES is the official ticketing partner of several State Road Transport Corporation (SRTC) operators and over 4000+ private bus partners covering more than 3,50,000 bus routes
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={0} sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
              bgcolor: 'transparent'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(216, 91, 83, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <LocationOnIcon sx={{ fontSize: 40, color: '#D85B53' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 500,
                color: '#1A237E',
                mb: 1
              }}>
                3,50,000+ Bus Routes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                offering unparalleled choices for your travel needs
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={0} sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
              bgcolor: 'transparent'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(216, 91, 83, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <DirectionsBusIcon sx={{ fontSize: 40, color: '#D85B53' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 500,
                color: '#1A237E',
                mb: 1
              }}>
                4000+ Bus Partners
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ranging from State RTCs to private partners
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={0} sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
              bgcolor: 'transparent'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(216, 91, 83, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <AccessTimeIcon sx={{ fontSize: 40, color: '#D85B53' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 500,
                color: '#1A237E',
                mb: 1
              }}>
                Fastest Bus Booking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                swift and seamless bus ticket booking experience
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={0} sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
              bgcolor: 'transparent'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(216, 91, 83, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <SupportAgentIcon sx={{ fontSize: 40, color: '#D85B53' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 500,
                color: '#1A237E',
                mb: 1
              }}>
                24/7 Customer Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                available for all your bus booking needs
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Additional Information */}
      <Box sx={{ my: 8, bgcolor: '#F8F9FA', p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          About BRES Bus Booking
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          BRES provides a seamless bus booking experience with a wide network of bus operators across India. Whether you're planning a short trip or a long journey, we offer various types of buses including Volvo AC buses, Luxury buses, Sleeper buses, and more.
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Our platform ensures secure transactions, instant confirmation, and 24/7 customer support. With features like live tracking, flexible cancellation policies, and exclusive discounts, BRES makes bus travel convenient and affordable.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Book your bus tickets with BRES and experience hassle-free travel planning. Our partnerships with leading bus operators ensure you get the best deals and reliable service for your journey.
        </Typography>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="info" 
          variant="filled"
          sx={{ 
            bgcolor: '#1A237E',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          This service is not available as of now. Please check back later.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 