import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Rating,
  Chip,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';

interface OperatorData {
  name: string;
  description: string;
  rating: number;
  totalReviews: number;
  busTypes: string[];
  popularRoutes: {
    from: string;
    to: string;
    price: number;
    frequency: string;
  }[];
  amenities: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

const operatorsData: Record<string, OperatorData> = {
  'volvo-express': {
    name: 'Volvo Express',
    description: 'Premium bus service with focus on comfort and safety.',
    rating: 4.5,
    totalReviews: 1250,
    busTypes: ['AC Sleeper', 'AC Seater', 'Non-AC'],
    popularRoutes: [
      {
        from: 'Delhi',
        to: 'Mumbai',
        price: 1500,
        frequency: 'Every 30 mins',
      },
      {
        from: 'Bangalore',
        to: 'Chennai',
        price: 800,
        frequency: 'Every 1 hour',
      },
    ],
    amenities: ['WiFi', 'USB Charging', 'Blanket', 'Water Bottle', 'Entertainment System'],
    contactInfo: {
      phone: '+91 1234567890',
      email: 'support@volvoexpress.com',
      address: 'Transport Nagar, Delhi',
    },
  },
  // Add more operators as needed
};

const OperatorInfo = () => {
  const { operatorId } = useParams<{ operatorId: string }>();
  const navigate = useNavigate();
  const operator = operatorsData[operatorId || ''];

  if (!operator) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Operator not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {operator.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={operator.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({operator.totalReviews} reviews)
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {operator.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Bus Types
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {operator.busTypes.map((type) => (
              <Chip key={type} label={type} />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Popular Routes
          </Typography>
          <Grid container spacing={3}>
            {operator.popularRoutes.map((route, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">
                      {route.from} → {route.to}
                    </Typography>
                    <Typography color="textSecondary">
                      Starting from ₹{route.price}
                    </Typography>
                    <Typography color="textSecondary">
                      Frequency: {route.frequency}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/route/${route.from.toLowerCase()}-${route.to.toLowerCase()}`)}
                    >
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Amenities
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {operator.amenities.map((amenity) => (
              <Chip key={amenity} label={amenity} />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography>Phone: {operator.contactInfo.phone}</Typography>
              <Typography>Email: {operator.contactInfo.email}</Typography>
              <Typography>Address: {operator.contactInfo.address}</Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OperatorInfo; 