import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Card,
  CardContent,
  Alert,
  Collapse,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentMethodCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardNumberField = styled(TextField)({
  '& input': {
    letterSpacing: '0.1em',
  },
});

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock booking details - in a real app, this would come from the previous page
  const bookingDetails = {
    from: 'Mumbai',
    to: 'Delhi',
    date: '2024-03-15',
    passengers: 2,
    busType: 'AC Sleeper',
    basePrice: 1200,
    taxes: 100,
    total: 2500,
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const validateForm = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    if (!cardName) {
      setError('Please enter the cardholder name');
      return false;
    }
    if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cvv || cvv.length !== 3) {
      setError('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        navigate('/booking-confirmation');
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Payment Form Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Select Payment Method
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <PaymentMethodCard 
                  onClick={() => setPaymentMethod('card')}
                  elevation={paymentMethod === 'card' ? 4 : 1}
                  sx={{ 
                    bgcolor: paymentMethod === 'card' ? 'primary.light' : 'background.paper',
                    color: paymentMethod === 'card' ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    <Typography>Credit/Debit Card</Typography>
                  </Box>
                </PaymentMethodCard>
              </Grid>
              <Grid item xs={6}>
                <PaymentMethodCard 
                  onClick={() => setPaymentMethod('netbanking')}
                  elevation={paymentMethod === 'netbanking' ? 4 : 1}
                  sx={{ 
                    bgcolor: paymentMethod === 'netbanking' ? 'primary.light' : 'background.paper',
                    color: paymentMethod === 'netbanking' ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceIcon sx={{ mr: 1 }} />
                    <Typography>Net Banking</Typography>
                  </Box>
                </PaymentMethodCard>
              </Grid>
            </Grid>

            <Collapse in={paymentMethod === 'card'}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CardNumberField
                      fullWidth
                      label="Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      value={cvv}
                      onChange={handleCvvChange}
                      type="password"
                      placeholder="123"
                    />
                  </Grid>
                </Grid>

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Payment successful! Redirecting to confirmation page...
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isProcessing}
                  sx={{ mt: 3 }}
                >
                  {isProcessing ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Pay ₹${bookingDetails.total}`
                  )}
                </Button>
              </form>
            </Collapse>

            <Collapse in={paymentMethod === 'netbanking'}>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Net Banking option will be available soon.
              </Typography>
            </Collapse>
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <SecurityIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Your payment information is secure and encrypted
            </Typography>
          </Box>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  From
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingDetails.from}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingDetails.to}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {bookingDetails.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bus Type
                </Typography>
                <Typography variant="body1">
                  {bookingDetails.busType}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Base Fare ({bookingDetails.passengers} tickets)</Typography>
                  <Typography variant="body2">₹{bookingDetails.basePrice}</Typography>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Taxes & Fees</Typography>
                  <Typography variant="body2">₹{bookingDetails.taxes}</Typography>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Amount
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ₹{bookingDetails.total}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage; 