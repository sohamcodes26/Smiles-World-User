import { useQuery } from '@tanstack/react-query';
import { getCancellationPolicy } from '../services/pagesApi';

/**
 * Custom hook to fetch the cancellation policy using React Query.
 * @returns {QueryResult} The result of the query, including data, isLoading, isError, etc.
 */
export const useCancellationPolicy = () => {
  return useQuery({
    // A unique key for this query. React Query uses this for caching.
    queryKey: ['cancellationPolicy'],

    // The function that will be called to fetch the data.
    queryFn: getCancellationPolicy,

    // staleTime: The time in milliseconds that data is considered fresh.
    // The data will be cached for 24 hours.
    staleTime: 1000 * 60 * 60 * 24,

    // refetchOnWindowFocus: Set to false to prevent refetching on window focus.
    refetchOnWindowFocus: false,
  });
};
