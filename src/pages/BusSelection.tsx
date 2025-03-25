import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const BusCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const SeatButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  minWidth: '40px',
  height: '40px',
  margin: '4px',
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.grey[200],
  color: selected ? 'white' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[300],
  },
  '&.disabled': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[600],
    cursor: 'not-allowed',
  },
}));

interface Bus {
  id: number;
  name: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availableSeats: number;
  amenities: string[];
}

const BusSelection = () => {
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const buses: Bus[] = [
    {
      id: 1,
      name: 'Luxury Express',
      departure: '10:00 AM',
      arrival: '2:30 PM',
      duration: '4h 30m',
      price: 45,
      availableSeats: 40,
      amenities: ['WiFi', 'USB Charging', 'Reclining Seats'],
    },
    {
      id: 2,
      name: 'Premium Coach',
      departure: '11:30 AM',
      arrival: '4:00 PM',
      duration: '4h 30m',
      price: 55,
      availableSeats: 35,
      amenities: ['WiFi', 'USB Charging', 'Reclining Seats', 'Entertainment System'],
    },
  ];

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 40; i++) {
      const isSelected = selectedSeats.includes(i);
      const isDisabled = Math.random() < 0.3; // Simulating some seats being booked
      seats.push(
        <SeatButton
          key={i}
          selected={isSelected}
          disabled={isDisabled}
          className={isDisabled ? 'disabled' : ''}
          onClick={() => !isDisabled && handleSeatSelect(i)}
        >
          <EventSeatIcon />
        </SeatButton>
      );
    }
    return seats;
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Available Buses
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {buses.map((bus) => (
            <BusCard key={bus.id}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">{bus.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">{bus.duration}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1">
                      Departure: {bus.departure}
                    </Typography>
                    <Typography variant="body1">
                      Arrival: {bus.arrival}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocalOfferIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">${bus.price}</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color={selectedBus === bus.id ? 'secondary' : 'primary'}
                      onClick={() => setSelectedBus(bus.id)}
                    >
                      {selectedBus === bus.id ? 'Selected' : 'Select Bus'}
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  {bus.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </BusCard>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Seat Selection
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {renderSeats()}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Selected Seats:</Typography>
                <Typography>{selectedSeats.join(', ') || 'None'}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={selectedSeats.length === 0}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusSelection; 