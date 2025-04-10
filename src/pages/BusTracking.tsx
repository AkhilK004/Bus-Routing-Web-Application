import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Paper,
  Theme,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TrackingCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const ProgressBar = styled(LinearProgress)(({ theme }: { theme: Theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'on-time' | 'delayed' }>(({ theme, status }) => ({
  backgroundColor:
    status === 'on-time'
      ? theme.palette.success.light
      : theme.palette.error.light,
  color: status === 'on-time' ? theme.palette.success.dark : theme.palette.error.dark,
}));

// Add new styled components for the dropdown
const DropdownButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const BusListItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

interface BusLocation {
  id: string;
  busNumber: string;
  name: string;
  currentLocation: string;
  progress: number;
  speed: number;
  status: 'on-time' | 'delayed';
  delay: string;
  nextStop: string;
  estimatedArrival: string;
  route: string;
  operator: string;
}

// Sample bus data
const busData: BusLocation[] = [
  {
    id: 'BUS001',
    busNumber: 'GW-001',
    name: 'Gwalior Express',
    currentLocation: 'Route 95, 25 miles from destination',
    progress: 65,
    speed: 65,
    status: 'delayed',
    delay: '15 minutes',
    nextStop: 'Central Station',
    estimatedArrival: '2:45 PM',
    route: 'Gwalior → Nagpur',
    operator: 'Gwalior Express',
  },
  {
    id: 'BUS002',
    busNumber: 'DL-002',
    name: 'Delhi Travels',
    currentLocation: 'Highway 1, 10 miles from destination',
    progress: 85,
    speed: 70,
    status: 'on-time',
    delay: '0 minutes',
    nextStop: 'City Center',
    estimatedArrival: '3:15 PM',
    route: 'Jhansi → Delhi',
    operator: 'Delhi Travels',
  },
  {
    id: 'BUS003',
    busNumber: 'MU-003',
    name: 'Mumbai Express',
    currentLocation: 'Expressway, 5 miles from destination',
    progress: 90,
    speed: 75,
    status: 'on-time',
    delay: '0 minutes',
    nextStop: 'Terminal Station',
    estimatedArrival: '1:30 PM',
    route: 'Bangalore → Mumbai',
    operator: 'Mumbai Express',
  },
  {
    id: 'BUS004',
    busNumber: 'CH-004',
    name: 'Chennai Travels',
    currentLocation: 'Route 66, 40 miles from destination',
    progress: 45,
    speed: 60,
    status: 'delayed',
    delay: '30 minutes',
    nextStop: 'South Station',
    estimatedArrival: '4:20 PM',
    route: 'Calcutta → Chennai',
    operator: 'Chennai Travels',
  },
];

// Sample bus tracking data
const busTrackingData = [
  {
    pnr: 'PNR123456',
    busNumber: 'GW-001',
    from: 'Gwalior',
    to: 'Nagpur',
    departureTime: '10:00 AM',
    arrivalTime: '2:30 PM',
    status: 'on-time',
    currentLocation: 'Bhopal',
  },
  {
    pnr: 'PNR789012',
    busNumber: 'DL-002',
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '9:00 AM',
    arrivalTime: '3:00 PM',
    status: 'delayed',
    currentLocation: 'Gurugram',
  },
  {
    pnr: 'PNR345678',
    busNumber: 'MU-003',
    from: 'Mumbai',
    to: 'Pune',
    departureTime: '11:30 AM',
    arrivalTime: '2:00 PM',
    status: 'on-time',
    currentLocation: 'Lonavala',
  },
];

const BusTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);
  const [searchResults, setSearchResults] = useState<BusLocation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [busLocation, setBusLocation] = useState<BusLocation>(busData[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTracking, setSelectedTracking] = useState<typeof busTrackingData[0] | null>(null);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = busData.filter(
      (bus) =>
        bus.busNumber.toLowerCase().includes(query) ||
        bus.name.toLowerCase().includes(query) ||
        bus.operator.toLowerCase().includes(query) ||
        bus.route.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setShowResults(true);
  };

  // Handle bus selection
  const handleSelectBus = (bus: BusLocation) => {
    setSelectedBus(bus);
    setBusLocation(bus);
    setShowResults(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + 0.5, 100),
        speed: Math.floor(Math.random() * 20) + 55, // Random speed between 55-75
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleTrackingSelect = (tracking: typeof busTrackingData[0]) => {
    setSelectedTracking(tracking);
    handleDropdownClose();
    // Find and select the corresponding bus
    const bus = busData.find(b => b.busNumber === tracking.busNumber);
    if (bus) {
      handleSelectBus(bus);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Live Bus Tracking
      </Typography>

      {/* Add Tracking Dropdown */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Select Bus to Track
          </Typography>
          <DropdownButton
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleDropdownClick}
          >
            {selectedTracking ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DirectionsBusIcon />
                <Typography>
                  {`${selectedTracking.busNumber} - ${selectedTracking.from} to ${selectedTracking.to}`}
                </Typography>
              </Box>
            ) : (
              'Select a bus to track'
            )}
          </DropdownButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '600px',
                mt: 1,
              },
            }}
          >
            {busTrackingData.map((tracking) => (
              <BusListItem
                key={tracking.pnr}
                onClick={() => handleTrackingSelect(tracking)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {tracking.busNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      PNR: {tracking.pnr}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      {tracking.from} → {tracking.to}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tracking.departureTime} - {tracking.arrivalTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <StatusChip
                      label={tracking.status === 'on-time' ? 'On Time' : 'Delayed'}
                      status={tracking.status as 'on-time' | 'delayed'}
                      size="small"
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Current: {tracking.currentLocation}
                    </Typography>
                  </Grid>
                </Grid>
              </BusListItem>
            ))}
          </Menu>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Track Your Bus
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search by Bus Number, Name, or Route"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsBusIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showResults && searchResults.length > 0 && (
              <Paper 
                sx={{ 
                  mt: 1, 
                  maxHeight: 300, 
                  overflow: 'auto',
                  position: 'absolute',
                  zIndex: 1000,
                  width: '100%'
                }}
              >
                {searchResults.map((bus) => (
                  <Box 
                    key={bus.id} 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                    onClick={() => handleSelectBus(bus)}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {bus.busNumber} - {bus.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {bus.route} | {bus.operator}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            )}
            {showResults && searchResults.length === 0 && (
              <Alert severity="info" sx={{ mt: 1 }}>
                No buses found matching your search criteria.
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Track Bus
            </Button>
          </Grid>
        </Grid>
      </Card>

      {selectedBus && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TrackingCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{busLocation.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bus Number: {busLocation.busNumber} | {busLocation.route}
                      </Typography>
                    </Box>
                    <StatusChip
                      icon={busLocation.status === 'on-time' ? <AccessTimeIcon /> : <WarningIcon />}
                      label={busLocation.status === 'on-time' ? 'On Time' : `Delayed ${busLocation.delay}`}
                      status={busLocation.status}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Location
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography>{busLocation.currentLocation}</Typography>
                    </Box>
                    <ProgressBar variant="determinate" value={busLocation.progress} />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SpeedIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="subtitle2">Current Speed</Typography>
                        </Box>
                        <Typography variant="h6">{busLocation.speed} mph</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="subtitle2">ETA</Typography>
                        </Box>
                        <Typography variant="h6">{busLocation.estimatedArrival}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </TrackingCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Journey Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Operator
                    </Typography>
                    <Typography>{busLocation.operator}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Next Stop
                    </Typography>
                    <Typography>{busLocation.nextStop}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography>
                      {busLocation.status === 'on-time'
                        ? 'Bus is running on schedule'
                        : `Bus is delayed by ${busLocation.delay}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {!selectedBus && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Enter a bus number, name, or route to track a bus.
        </Alert>
      )}
    </Container>
  );
};

export default BusTracking; 