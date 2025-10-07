import { useQuery } from '@tanstack/react-query';
import { getPodcastById } from '../services/pagesApi';

/**
 * Custom hook to fetch a single podcast by its ID.
 * @param {string} podcastId - The ID of the podcast to fetch.
 * @returns {QueryResult} The result of the query, including data, isLoading, isError, etc.
 */
export const usePodcast = (podcastId) => {
  return useQuery({
    queryKey: ['podcast', podcastId],
    queryFn: () => getPodcastById(podcastId),
    enabled: !!podcastId, // The query will not run until the podcastId is available
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
    refetchOnWindowFocus: false,
  });
};
