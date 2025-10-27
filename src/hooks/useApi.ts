import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

// Generic hook for API calls with loading and error states
export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>, showSuccessToast = false, successMessage = 'Operación exitosa') => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);

      if (showSuccessToast) {
        toast.success(successMessage);
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error inesperado';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
}

// Hook specifically for paginated API calls
export function usePaginatedApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const execute = useCallback(async (apiCall: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();

      setData(result.content || []);
      setTotalElements(result.totalElements || 0);
      setTotalPages(result.totalPages || 0);
      setCurrentPage(result.number || 0);

      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error inesperado';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData([]);
    setTotalElements(0);
    setTotalPages(0);
    setCurrentPage(0);
  }, []);

  return {
    loading,
    error,
    data,
    totalElements,
    totalPages,
    currentPage,
    execute,
    reset,
  };
}

export default useApi;
