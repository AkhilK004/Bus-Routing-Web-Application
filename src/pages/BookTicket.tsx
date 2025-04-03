import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ScheduleCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

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
  {
    id: '3',
    from: 'Bangalore',
    to: 'Mumbai',
    departureTime: '07:30 PM',
    arrivalTime: '12:15 PM',
    duration: '4h 45m',
    price: 940,
    seatsAvailable: 12,
    busType: 'AC',
    operator: 'Mumbai Express',
    busNumber: 'MU-003',
  },
  {
    id: '4',
    from: 'Calcutta',
    to: 'Chennai',
    departureTime: '09:00 PM',
    arrivalTime: '04:30 AM',
    duration: '7h 30m',
    price: 1200,
    seatsAvailable: 20,
    busType: 'Sleeper',
    operator: 'Chennai Travels',
    busNumber: 'CH-004',
  },
  {
    id: '5',
    from: 'Dharwad',
    to: 'Bangalore',
    departureTime: '10:00 PM',
    arrivalTime: '03:45 AM',
    duration: '5h 45m',
    price: 750,
    seatsAvailable: 18,
    busType: 'AC',
    operator: 'Bangalore Express',
    busNumber: 'BL-005',
  },
  {
    id: '6',
    from: 'Jaipur',
    to: 'Delhi',
    departureTime: '11:00 PM',
    arrivalTime: '04:15 AM',
    duration: '5h 15m',
    price: 850,
    seatsAvailable: 10,
    busType: 'AC',
    operator: 'Delhi Travels',
    busNumber: 'DL-006',
  },
  {
    id: '7',
    from: 'Hyderabad',
    to: 'Chennai',
    departureTime: '08:30 PM',
    arrivalTime: '03:00 AM',
    duration: '6h 30m',
    price: 950,
    seatsAvailable: 14,
    busType: 'Sleeper',
    operator: 'Chennai Travels',
    busNumber: 'CH-007',
  },
  {
    id: '8',
    from: 'Pune',
    to: 'Mumbai',
    departureTime: '07:00 PM',
    arrivalTime: '10:45 PM',
    duration: '3h 45m',
    price: 550,
    seatsAvailable: 22,
    busType: 'AC',
    operator: 'Mumbai Express',
    busNumber: 'MU-008',
  },
];

const BookTicket = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [busType, setBusType] = useState('');

  const cities = Array.from(new Set(busSchedules.flatMap(schedule => [schedule.from, schedule.to]))).sort();

  const filteredSchedules = busSchedules.filter(schedule => {
    if (fromCity && schedule.from !== fromCity) return false;
    if (toCity && schedule.to !== toCity) return false;
    if (busType && schedule.busType !== busType) return false;
    return true;
  });

  const handleBookNow = (scheduleId: string) => {
    navigate(`/select-seats/${scheduleId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Your Ticket
      </Typography>

      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select
                value={fromCity}
                label="From"
                onChange={(e) => setFromCity(e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select
                value={toCity}
                label="To"
                onChange={(e) => setToCity(e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Bus Type</InputLabel>
              <Select
                value={busType}
                label="Bus Type"
                onChange={(e) => setBusType(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="AC">AC</MenuItem>
                <MenuItem value="Non-AC">Non-AC</MenuItem>
                <MenuItem value="Sleeper">Sleeper</MenuItem>
                <MenuItem value="Seater">Seater</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bus Details</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {schedule.operator}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bus No: {schedule.busNumber}
                  </Typography>
                  <Chip
                    label={schedule.busType}
                    size="small"
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    <Box>
                      <Typography variant="body2">
                        {schedule.from} → {schedule.to}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {schedule.departureTime} - {schedule.arrivalTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {schedule.duration}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeatIcon color="primary" />
                    <Typography>
                      {schedule.seatsAvailable} seats left
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    ₹{schedule.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookNow(schedule.id)}
                  >
                    Book Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookTicket; 