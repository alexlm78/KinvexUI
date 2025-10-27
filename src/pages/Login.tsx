import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
} from '@mui/material';

const Login: React.FC = () => {
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
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Kinvex
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              Página de login en desarrollo...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
