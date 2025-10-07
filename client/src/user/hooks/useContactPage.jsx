import { useQuery } from '@tanstack/react-query';
import { getContactPageContent } from '../services/pagesApi';

/**
 * Custom hook to fetch Contact page content using React Query.
 * @returns {QueryResult} The result of the query, including data, isLoading, isError, etc.
 */
export const useContactPage = () => {
  return useQuery({
    // A unique key for this query. React Query uses this for caching.
    queryKey: ['contactPageData'],

    // The function that will be called to fetch the data.
    queryFn: getContactPageContent,

    // staleTime: The time in milliseconds that data is considered fresh.
    // During this time, no new network request will be made.
    staleTime: 1000 * 60 * 60 * 24, // 24 hours

    // refetchOnWindowFocus: Set to false to prevent refetching on window focus.
    refetchOnWindowFocus: false,
  });
};
