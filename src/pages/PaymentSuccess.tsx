import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircleIcon
            sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Your booking has been confirmed. You will receive an email with your ticket details shortly.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => handleNavigate('/')}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleNavigate('/track-bus')}
            >
              Track Bus
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentSuccess; 