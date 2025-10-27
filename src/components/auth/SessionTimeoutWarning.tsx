import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

interface SessionTimeoutWarningProps {
  warningTimeMinutes?: number; // Show warning X minutes before expiration
}

export const SessionTimeoutWarning: React.FC<SessionTimeoutWarningProps> = ({
  warningTimeMinutes = 5,
}) => {
  const { isAuthenticated, refreshToken, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowWarning(false);
      return;
    }

    // Check for token expiration every minute
    const interval = setInterval(() => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        // Decode JWT to get expiration time
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;
        const minutesUntilExpiration = Math.floor(timeUntilExpiration / (1000 * 60));

        if (minutesUntilExpiration <= warningTimeMinutes && minutesUntilExpiration > 0) {
          setShowWarning(true);
          setTimeLeft(minutesUntilExpiration);
        } else if (minutesUntilExpiration <= 0) {
          // Token expired, logout user
          logout();
        } else {
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, warningTimeMinutes, logout]);

  const handleExtendSession = async () => {
    try {
      const success = await refreshToken();
      if (success) {
        setShowWarning(false);
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setShowWarning(false);
  };

  if (!showWarning) return null;

  const progressValue = ((warningTimeMinutes - timeLeft) / warningTimeMinutes) * 100;

  return (
    <Dialog
      open={showWarning}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Warning color="warning" />
        Sesión por Expirar
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Tu sesión expirará en <strong>{timeLeft} minuto{timeLeft !== 1 ? 's' : ''}</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ¿Deseas extender tu sesión o cerrar sesión?
        </Typography>

        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color="warning"
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleLogout} color="error">
          Cerrar Sesión
        </Button>
        <Button onClick={handleExtendSession} variant="contained">
          Extender Sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};
