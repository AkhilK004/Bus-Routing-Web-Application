import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface BusRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  operators: string[];
  frequency: string;
  price: { min: number; max: number };
  buses: {
    name: string;
    type: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
  }[];
}

const routeData: Record<string, BusRoute> = {
  'delhi-mumbai': {
    id: 'delhi-mumbai',
    from: 'Delhi',
    to: 'Mumbai',
    duration: '16-18 hours',
    distance: '1,400 km',
    operators: ['Volvo Express', 'Luxury Travels', 'Premium Bus'],
    frequency: 'Every 30 minutes',
    price: { min: 800, max: 2500 },
    buses: [
      {
        name: 'Volvo Express',
        type: 'AC Sleeper',
        departureTime: '18:00',
        arrivalTime: '10:00',
        price: 1500,
      },
      {
        name: 'Luxury Travels',
        type: 'AC Seater',
        departureTime: '19:30',
        arrivalTime: '11:30',
        price: 1200,
      },
    ],
  },
  // Add more routes as needed
};

const RouteInfo = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const route = routeData[routeId || ''];

  if (!route) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Route not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {route.from} to {route.to}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>Duration: {route.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>Distance: {route.distance}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Frequency: {route.frequency}
              </Typography>
              <Typography variant="body1">
                Price Range: ₹{route.price.min} - ₹{route.price.max}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Available Operators:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {route.operators.map((operator) => (
                  <Chip
                    key={operator}
                    label={operator}
                    size="small"
                    onClick={() => navigate(`/operator/${operator.toLowerCase().replace(' ', '-')}`)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Available Buses
      </Typography>
      <Grid container spacing={3}>
        {route.buses.map((bus, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">{bus.name}</Typography>
                    <Typography color="textSecondary">{bus.type}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">{bus.departureTime}</Typography>
                      <Typography variant="body1">{bus.arrivalTime}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Duration: {route.duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">₹{bus.price}</Typography>
                      <Button variant="contained" color="primary">
                        View Seats
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RouteInfo; 