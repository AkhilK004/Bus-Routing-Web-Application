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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningIcon from '@mui/icons-material/Warning';

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

interface BusLocation {
  id: string;
  name: string;
  currentLocation: string;
  progress: number;
  speed: number;
  status: 'on-time' | 'delayed';
  delay: string;
  nextStop: string;
  estimatedArrival: string;
}

const BusTracking = () => {
  const [busLocation, setBusLocation] = useState<BusLocation>({
    id: 'BUS001',
    name: 'Luxury Express',
    currentLocation: 'Route 95, 25 miles from destination',
    progress: 65,
    speed: 65,
    status: 'delayed',
    delay: '15 minutes',
    nextStop: 'Central Station',
    estimatedArrival: '2:45 PM',
  });

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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Live Bus Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TrackingCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{busLocation.name}</Typography>
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
                  Next Stop
                </Typography>
                <Typography>{busLocation.nextStop}</Typography>
              </Box>
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
    </Container>
  );
};

export default BusTracking; 