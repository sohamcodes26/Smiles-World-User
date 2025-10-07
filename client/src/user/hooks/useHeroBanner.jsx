import { useQuery } from '@tanstack/react-query';
import { getHomePageContent } from '../services/herobannerApi.js';

/**
 * Custom hook to fetch the home page's content, including the hero banner.
 * Caches the data for 24 hours.
 * @returns {QueryResult} The result of the query from React Query.
 */
export const useHomePageContent = () => {
  return useQuery({
    queryKey: ['homePageContent'],
    queryFn: getHomePageContent,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};