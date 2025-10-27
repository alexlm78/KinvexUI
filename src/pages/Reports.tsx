import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reportes
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Visualiza reportes de inventario y movimientos
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Módulo de reportes en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;
