import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const Orders: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Órdenes de Compra
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Gestiona las órdenes de compra a proveedores
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Módulo de órdenes en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Orders;
