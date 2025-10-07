import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '../services/pagesApi';

/**
 * Custom hook to fetch a single blog post by its ID.
 * @param {string} blogId - The ID of the blog post.
 * @returns {QueryResult} The result of the query.
 */
export const useBlogPost = (blogId) => {
  return useQuery({
    queryKey: ['blogPost', blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId, // The query will not run until the blogId is available
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
    refetchOnWindowFocus: false,
  });
};
