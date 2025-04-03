import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Theme,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams, useNavigate } from 'react-router-dom';

const BusLayout = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
}));

const SeatButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'available' | 'selected' | 'booked' | 'ladies' }>(({ theme, status }) => ({
  minWidth: '40px',
  height: '40px',
  margin: '4px',
  padding: 0,
  backgroundColor:
    status === 'available'
      ? theme.palette.success.light
      : status === 'selected'
      ? theme.palette.primary.main
      : status === 'booked'
      ? theme.palette.grey[400]
      : theme.palette.secondary.light,
  color:
    status === 'available' || status === 'selected'
      ? theme.palette.common.white
      : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor:
      status === 'available'
        ? theme.palette.success.main
        : status === 'selected'
        ? theme.palette.primary.dark
        : status === 'booked'
        ? theme.palette.grey[400]
        : theme.palette.secondary.main,
  },
  '&.disabled': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[600],
    cursor: 'not-allowed',
  },
}));

const DriverArea = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  height: '60px',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    transform: 'translateX(-50%) rotate(45deg)',
  },
}));

interface Seat {
  id: number;
  status: 'available' | 'selected' | 'booked' | 'ladies';
  row: number;
  column: number;
}

interface BusSchedule {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Seater';
  operator: string;
  busNumber: string;
}

// Sample bus schedules data (in a real app, this would come from an API)
const busSchedules: BusSchedule[] = [
  {
    id: '1',
    from: 'Gwalior',
    to: 'Nagpur',
    departureTime: '06:00 AM',
    arrivalTime: '10:30 AM',
    duration: '4h 30m',
    price: 450,
    seatsAvailable: 15,
    busType: 'AC',
    operator: 'Gwalior Express',
    busNumber: 'GW-001',
  },
  {
    id: '2',
    from: 'Jhansi',
    to: 'Delhi',
    departureTime: '08:00 PM',
    arrivalTime: '02:15 AM',
    duration: '6h 15m',
    price: 650,
    seatsAvailable: 8,
    busType: 'Sleeper',
    operator: 'Delhi Travels',
    busNumber: 'DL-002',
  },
  // ... other schedules
];

const SeatSelection = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [schedule, setSchedule] = useState<BusSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch schedule data
  useEffect(() => {
    // Simulate API call
    const fetchSchedule = () => {
      setLoading(true);
      try {
        const foundSchedule = busSchedules.find(s => s.id === scheduleId);
        if (foundSchedule) {
          setSchedule(foundSchedule);
        } else {
          setError('Bus schedule not found');
        }
      } catch (err) {
        setError('Failed to load bus schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  // Generate seat layout (4 rows x 4 columns)
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    let id = 1;
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        // Randomly assign seat status for demo
        const status: 'available' | 'selected' | 'booked' | 'ladies' =
          Math.random() < 0.3
            ? 'booked'
            : Math.random() < 0.2
            ? 'ladies'
            : 'available';
        seats.push({
          id: id++,
          status,
          row,
          column: col,
        });
      }
    }
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      if (selectedSeats.includes(seat.id)) {
        setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
      } else {
        setSelectedSeats([...selectedSeats, seat.id]);
      }
    }
  };

  const handleProceedToPayment = () => {
    if (schedule) {
      // Navigate to payment page with selected seats and schedule info
      navigate(`/payment/${scheduleId}`, { 
        state: { 
          selectedSeats,
          schedule
        } 
      });
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !schedule) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || 'Bus schedule not found'}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/book-ticket')}
          sx={{ mt: 2 }}
        >
          Back to Bus Search
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Select Your Seats
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <BusLayout>
            <DriverArea>
              <DirectionsBusIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h6">Driver</Typography>
            </DriverArea>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1, 2, 3, 4].map((row) => (
                <Box
                  key={row}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  {seats
                    .filter((seat) => seat.row === row)
                    .map((seat) => (
                      <Tooltip
                        key={seat.id}
                        title={`Seat ${seat.id} - ${
                          seat.status === 'ladies'
                            ? 'Ladies Seat'
                            : seat.status === 'booked'
                            ? 'Booked'
                            : 'Available'
                        }`}
                      >
                        <span>
                          <SeatButton
                            status={seat.status}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === 'booked'}
                          >
                            <EventSeatIcon />
                          </SeatButton>
                        </span>
                      </Tooltip>
                    ))}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeatButton status="available">
                  <EventSeatIcon />
                </SeatButton>
                <Typography>Available</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeatButton status="selected">
                  <EventSeatIcon />
                </SeatButton>
                <Typography>Selected</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeatButton status="booked">
                  <EventSeatIcon />
                </SeatButton>
                <Typography>Booked</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeatButton status="ladies">
                  <EventSeatIcon />
                </SeatButton>
                <Typography>Ladies Seat</Typography>
              </Box>
            </Box>
          </BusLayout>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Journey Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{schedule.from} → {schedule.to}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{schedule.departureTime} - {schedule.arrivalTime}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Duration: {schedule.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Bus: {schedule.busNumber} | {schedule.busType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Operator: {schedule.operator}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Selected Seats
                </Typography>
                <Typography>
                  {selectedSeats.length > 0
                    ? selectedSeats.join(', ')
                    : 'No seats selected'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{selectedSeats.length * schedule.price}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={selectedSeats.length === 0}
                onClick={handleProceedToPayment}
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

export default SeatSelection; 