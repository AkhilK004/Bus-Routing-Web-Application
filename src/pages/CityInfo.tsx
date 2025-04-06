import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationCityIcon from '@mui/icons-material/LocationCity';

interface CityData {
  name: string;
  description: string;
  popularRoutes: { to: string; frequency: string; price: number }[];
  operators: string[];
  busStands: { name: string; address: string }[];
}

const citiesData: Record<string, CityData> = {
  'delhi': {
    name: 'Delhi',
    description: 'Delhi is well-connected to all major cities with frequent bus services.',
    popularRoutes: [
      { to: 'Mumbai', frequency: 'Every 30 mins', price: 1500 },
      { to: 'Jaipur', frequency: 'Every 15 mins', price: 800 },
      { to: 'Chandigarh', frequency: 'Every 20 mins', price: 600 },
    ],
    operators: ['Volvo Express', 'Luxury Travels', 'Premium Bus'],
    busStands: [
      { name: 'Kashmere Gate ISBT', address: 'Kashmere Gate, Delhi' },
      { name: 'Anand Vihar ISBT', address: 'Anand Vihar, Delhi' },
    ],
  },
  // Add more cities as needed
};

const CityInfo = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const city = citiesData[cityId || ''];

  if (!city) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">City not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Bus Services in {city.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {city.description}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Popular Routes from {city.name}
          </Typography>
          <Grid container spacing={3}>
            {city.popularRoutes.map((route) => (
              <Grid item xs={12} md={4} key={route.to}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{city.name} → {route.to}</Typography>
                    <Typography color="textSecondary">
                      Frequency: {route.frequency}
                    </Typography>
                    <Typography color="textSecondary">
                      Starting from ₹{route.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/route/${city.name.toLowerCase()}-${route.to.toLowerCase()}`)}
                    >
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Bus Operators
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {city.operators.map((operator) => (
              <Chip
                key={operator}
                label={operator}
                onClick={() => navigate(`/operator/${operator.toLowerCase().replace(' ', '-')}`)}
              />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Bus Stands
          </Typography>
          <Grid container spacing={2}>
            {city.busStands.map((stand) => (
              <Grid item xs={12} md={6} key={stand.name}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">{stand.name}</Typography>
                    <Typography color="textSecondary">{stand.address}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CityInfo; 