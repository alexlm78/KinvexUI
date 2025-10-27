import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { Lock, ArrowBack } from '@mui/icons-material';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Lock
              sx={{
                fontSize: 64,
                color: 'error.main',
                mb: 2,
              }}
            />

            <Typography variant="h4" component="h1" gutterBottom>
              Acceso Denegado
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              No tienes permisos suficientes para acceder a esta página.
              Contacta al administrador si crees que esto es un error.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleGoBack}
              >
                Volver
              </Button>

              <Button
                variant="contained"
                onClick={handleGoHome}
              >
                Ir al Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Unauthorized;
