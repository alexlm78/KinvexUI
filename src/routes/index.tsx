import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/entities';

// Lazy load components
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Products = React.lazy(() => import('@/pages/Products'));
const Orders = React.lazy(() => import('@/pages/Orders'));
const Reports = React.lazy(() => import('@/pages/Reports'));
const Login = React.lazy(() => import('@/pages/Login'));
const Unauthorized = React.lazy(() => import('@/pages/Unauthorized'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
    }}
  >
    <CircularProgress />
  </Box>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard - accessible to all authenticated users */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Products - accessible to OPERATOR and above */}
          <Route
            path="products"
            element={
              <ProtectedRoute requiredRole={UserRole.OPERATOR}>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* Orders - accessible to OPERATOR and above */}
          <Route
            path="orders"
            element={
              <ProtectedRoute requiredRole={UserRole.OPERATOR}>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Reports - accessible to MANAGER and above */}
          <Route
            path="reports"
            element={
              <ProtectedRoute requiredRole={UserRole.MANAGER}>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};
