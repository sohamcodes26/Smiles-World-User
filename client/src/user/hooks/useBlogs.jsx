import { useQuery } from '@tanstack/react-query';
import { getAllBlogs } from '../services/pagesApi';

/**
 * Custom hook to fetch all blog posts.
 * @returns {QueryResult} The result of the query.
 */
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};
