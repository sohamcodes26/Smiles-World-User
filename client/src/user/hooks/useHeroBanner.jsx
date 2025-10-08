import { useQuery } from '@tanstack/react-query';
import { getPageContent } from '../services/heroBannerApi.js';

// Common options for all banner hooks
const queryOptions = {
  staleTime: 1000 * 60 * 60 * 24, // Data is considered fresh for 24 hours
  refetchOnWindowFocus: false,     // Don't refetch when the user focuses the window
  refetchOnReconnect: false,       // Don't refetch on network reconnect
};

/**
 * Fetches and caches the hero banner content for the Home page.
 */
export const useHomeBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'home'],
    queryFn: () => getPageContent('home'),
    ...queryOptions,
  });
};

/**
 * Fetches and caches the hero banner content for the Domestic page.
 */
export const useDomesticBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'domestic'],
    queryFn: () => getPageContent('domestic'),
    ...queryOptions,
  });
};

/**
 * Fetches and caches the hero banner content for the International page.
 */
export const useInternationalBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'international'],
    queryFn: () => getPageContent('international'),
    ...queryOptions,
  });
};

/**
 * Fetches and caches the hero banner content for the Women Travel page.
 * Note: The backend route is 'women-travel'.
 */
export const useWomenBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'women-travel'],
    queryFn: () => getPageContent('women-travel'),
    ...queryOptions,
  });
};

/**
 * Fetches and caches the hero banner content for the Blog page.
 */
export const useBlogBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'blog'],
    queryFn: () => getPageContent('blog'),
    ...queryOptions,
  });
};


// --- NEW HOOK ADDED ---
/**
 * Fetches and caches the hero banner content for the Group Departures page.
 * Note: The backend route is 'group-departures'.
 */
export const useGroupBanner = () => {
  return useQuery({
    queryKey: ['pageContent', 'group-departures'],
    queryFn: () => getPageContent('group-departures'),
    ...queryOptions,
  });
};