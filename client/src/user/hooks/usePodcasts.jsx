import { useQuery } from '@tanstack/react-query';
import { getAllPodcasts } from '../services/pagesApi';

/**
 * Custom hook to fetch all podcasts.
 * @returns {QueryResult} The result of the query, including data, isLoading, isError, etc.
 */
export const usePodcasts = () => {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: getAllPodcasts,
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
    refetchOnWindowFocus: false,
  });
};
