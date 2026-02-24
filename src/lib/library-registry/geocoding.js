/**
 * Geocoding utilities for location-based library search
 * Uses browser Geolocation API and fallback geocoding
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(coord1, coord2) {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(coord2.lat - coord1.lat)
  const dLng = toRad(coord2.lng - coord1.lng)
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Get user's current location using browser Geolocation API
 */
export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      { timeout: 10000 }
    )
  })
}

/**
 * Geocode a location string (city, zip, address) to coordinates
 * Uses Nominatim (OpenStreetMap) - free, no API key required
 */
export async function geocodeLocation(location) {
  try {
    // Add USA context to help find correct locations
    const searchQuery = location.includes('USA') || location.includes('United States') 
      ? location 
      : `${location}, USA`
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'LibraryDiscoveryPlatform/1.0',
        },
      }
    )
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    
    if (!data || data.length === 0) {
      throw new Error('Location not found')
    }
    
    const result = data[0]
    
    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      formattedAddress: result.display_name,
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}

/**
 * Reverse geocode coordinates to a readable location
 */
export async function reverseGeocode(coords) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` +
      `lat=${coords.lat}&lon=${coords.lng}&format=json`,
      {
        headers: {
          'User-Agent': 'LibraryDiscoveryPlatform/1.0',
        },
      }
    )
    
    if (!response.ok) {
      throw new Error('Reverse geocoding failed')
    }
    
    const data = await response.json()
    
    return {
      lat: coords.lat,
      lng: coords.lng,
      city: data.address?.city || data.address?.town,
      state: data.address?.state,
      formattedAddress: data.display_name,
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    throw error
  }
}
