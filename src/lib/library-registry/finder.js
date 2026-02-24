/**
 * Library Finder - Locate nearby libraries and check availability
 */

import { calculateDistance } from './geocoding.js'
import { CALIFORNIA_LIBRARIES } from './california-libraries.js'

/**
 * Find libraries near a location
 * Returns one result per district (closest branch only)
 */
export function findNearbyLibraries(
  userLocation,
  maxDistanceMiles = 50
) {
  const results = []
  
  // For each library district, find the closest branch
  for (const district of CALIFORNIA_LIBRARIES) {
    let closestBranch = null
    let shortestDistance = Infinity
    
    for (const branch of district.branches) {
      const distance = calculateDistance(userLocation, branch.location)
      
      if (distance < shortestDistance) {
        shortestDistance = distance
        closestBranch = branch
      }
    }
    
    // Only include if within max distance
    if (closestBranch && shortestDistance <= maxDistanceMiles) {
      results.push({
        district,
        closestBranch,
        distance: shortestDistance,
      })
    }
  }
  
  // Sort by distance (closest first)
  results.sort((a, b) => a.distance - b.distance)
  
  return results
}

/**
 * Generate direct search URL for a library
 */
export function getLibrarySearchUrl(
  district,
  bookTitle,
  isbn
) {
  const searchTerm = isbn || bookTitle
  
  // Use custom search pattern if available
  if (district.customSearchPattern) {
    return district.customSearchPattern.replace('{QUERY}', encodeURIComponent(searchTerm))
  }
  
  switch (district.adapterType) {
    case 'lapl':
      // LAPL uses ls2pac - use direct search with query parameter
      return `https://ls2pac.lapl.org/?section=search&term=${encodeURIComponent(searchTerm)}`
    
    case 'spl':
      // SPL uses BiblioCommons
      return `https://seattle.bibliocommons.com/v2/search?query=${encodeURIComponent(searchTerm)}`
    
    case 'generic':
      // Use provided search URL
      if (district.searchUrl) {
        // Try to append query parameter intelligently
        const separator = district.searchUrl.includes('?') ? '&' : '?'
        return `${district.searchUrl}${separator}q=${encodeURIComponent(searchTerm)}`
      }
      return district.website
    
    default:
      return district.website
  }
}
