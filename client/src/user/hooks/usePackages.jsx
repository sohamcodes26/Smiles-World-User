import { useQuery } from '@tanstack/react-query';
import { 
  getFeaturedPackages, 
  getPackageById,
  getDomesticPackages,
  getInternationalPackages, // <-- Import the new function
  getWomenOnlyPackages,
  getGroupDeparturePackages
} from '../services/packagesApi.js';

/**
 * Custom hook to fetch featured travel packages.
 */
export const useFeaturedPackages = () => {
  return useQuery({
    queryKey: ['featuredPackages'],
    queryFn: getFeaturedPackages,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch a single travel package by its ID.
 */
export const usePackageById = (packageId) => {
  return useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: !!packageId, 
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch all domestic travel packages.
 */
export const useDomesticPackages = () => {
  return useQuery({
    queryKey: ['domesticPackages'],
    queryFn: getDomesticPackages,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

// --- NEW HOOK ADDED ---
/**
 * Custom hook to fetch all international travel packages.
 * Caches the data for 1 hour.
 * @returns {QueryResult} The result of the query from React Query.
 */
export const useInternationalPackages = () => {
  return useQuery({
    queryKey: ['internationalPackages'],
    queryFn: getInternationalPackages,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};




// --- NEW HOOK ADDED ---
/**
 * Custom hook to fetch women-only packages, with optional filtering by tag.
 * @param {{ tag?: string }} params - Optional parameters, e.g., { tag: 'domestic' }.
 * @returns {QueryResult} The result of the query from React Query.
 */
export const useWomenOnlyPackages = (params = {}) => {
  return useQuery({
    // The query key includes the tag to cache domestic/international results separately
    queryKey: ['womenOnlyPackages', params.tag],
    queryFn: () => getWomenOnlyPackages(params),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};


// --- NEW HOOK ADDED ---
/**
 * Custom hook to fetch group departure packages, with optional filtering by tag.
 * @param {{ tag?: string }} params - Optional parameters, e.g., { tag: 'domestic' }.
 * @returns {QueryResult} The result of the query from React Query.
 */
export const useGroupDeparturePackages = (params = {}) => {
  return useQuery({
    queryKey: ['groupDeparturePackages', params.tag],
    queryFn: () => getGroupDeparturePackages(params),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};