import { useQuery } from '@tanstack/react-query';
import { getAboutPageContent } from '../services/pagesApi';

/**
 * Custom hook to fetch About page content using React Query.
 * @returns {QueryResult} The result of the query, including data, isLoading, isError, etc.
 */
export const useAboutPage = () => {
  return useQuery({
    // A unique key for this query. React Query uses this for caching.
    queryKey: ['aboutPageData'],

    // The function that will be called to fetch the data.
    queryFn: getAboutPageContent,

    // staleTime: The time in milliseconds that data is considered fresh.
    // During this time, no new network request will be made.
    // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    staleTime: 1000 * 60 * 60 * 24,

    // cacheTime: The time in milliseconds that inactive query data is kept in the cache.
    // Defaults to 5 minutes. We can extend it if needed.
    // cacheTime: 1000 * 60 * 60 * 24, // 1 day

    // refetchOnWindowFocus: Set to false to prevent refetching on window focus.
    refetchOnWindowFocus: false,
  });
};

