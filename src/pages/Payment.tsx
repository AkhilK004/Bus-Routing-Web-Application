import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentMethodCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const steps = ['Select Seats', 'Payment', 'Confirmation'];

interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  // Mock booking details - in a real app, this would come from previous steps
  const bookingDetails = {
    busName: 'Express Bus Service',
    from: 'New York',
    to: 'Boston',
    date: '2024-04-05',
    seats: ['A1', 'A2'],
    totalAmount: 120.00,
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
    setError('');
  };

  const handleInputChange = (field: keyof PaymentDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentDetails({ ...paymentDetails, [field]: event.target.value });
    setError('');
  };

  const handlePayment = () => {
    // Add payment validation logic here
    if (selectedMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardHolder || 
          !paymentDetails.expiryDate || !paymentDetails.cvv) {
        setError('Please fill in all card details');
        return;
      }
    }

    // Mock successful payment
    // In a real app, you would integrate with a payment gateway here
    navigate('/payment-success');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Payment Method
              </Typography>
              <RadioGroup
                value={selectedMethod}
                onChange={handlePaymentMethodChange}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PaymentMethodCard>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CreditCardIcon sx={{ mr: 1 }} />
                              Credit/Debit Card
                            </Box>
                          }
                        />
                      </CardContent>
                    </PaymentMethodCard>
                  </Grid>
                  <Grid item xs={12}>
                    <PaymentMethodCard>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                          value="upi"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PaymentIcon sx={{ mr: 1 }} />
                              UPI Payment
                            </Box>
                          }
                        />
                      </CardContent>
                    </PaymentMethodCard>
                  </Grid>
                  <Grid item xs={12}>
                    <PaymentMethodCard>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                          value="netbanking"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccountBalanceIcon sx={{ mr: 1 }} />
                              Net Banking
                            </Box>
                          }
                        />
                      </CardContent>
                    </PaymentMethodCard>
                  </Grid>
                </Grid>
              </RadioGroup>
            </CardContent>
          </Card>

          {selectedMethod === 'card' && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Card Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange('cardNumber')}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Holder Name"
                      value={paymentDetails.cardHolder}
                      onChange={handleInputChange('cardHolder')}
                      placeholder="John Doe"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange('expiryDate')}
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      type="password"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange('cvv')}
                      placeholder="123"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {bookingDetails.busName}
                </Typography>
                <Typography>
                  {bookingDetails.from} → {bookingDetails.to}
                </Typography>
                <Typography variant="body2">
                  Date: {bookingDetails.date}
                </Typography>
                <Typography variant="body2">
                  Seats: {bookingDetails.seats.join(', ')}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${bookingDetails.totalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment; 