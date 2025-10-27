import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const Products: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Productos
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Administra tu inventario de productos
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Módulo de productos en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Products;
