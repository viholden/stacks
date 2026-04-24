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
 * Generate direct search URL for a library with optional filters.
 *
 * Catalog systems covered:
 * - LAPL:          ls2pac.lapl.org          (JSON facetFilters)
 * - Sirsi Ent.:    *.ent.sirsi.net           (qu=, qf= for format, av=0 for available)
 *   - PVLD:        palos.ent.sirsi.net       (ITYPE facets)
 *   - LA County:   catalog.lacountylibrary.org
 *   - Redondo:     redon.ent.sirsi.net       (FORMAT facets, not ITYPE)
 *   - Inglewood:   inglewood.ent.sirsi.net   (ITYPE facets)
 *   - Burbank:     burb.ent.sirsi.net
 *   - S. Pasadena: spas.ent.sirsi.net
 *   - Whittier:    wpca.sirsi.net
 *   - Pasadena:    pasadena.ent.sirsi.net
 *   - Ventura Co.: vent2.ent.sirsi.net
 * - Polaris:       *.polarislibrary.com      (URL-based search, no availability filter)
 * - Vega / iii:    *.iiivega.com             (materialTypeIds, universalLimiterIds)
 * - BiblioCommons: *.bibliocommons.com        (f_FORMAT=, f_STATUS=_physical_)
 * - Biblionix:     *.biblionix.com           (session-based — links to catalog homepage)
 * - Koha OPAC:     cgi-bin/koha/opac-search  (limit=available, limit=itype:X)
 * - VuFind:        discovery.arcadialibrary.org (filter[]=...)
 * - III Millennium: catalog.cerritos.gov     (searchtype=X, m=a for books)
 */
export function getLibrarySearchUrl(
  district,
  bookTitle,
  isbn,
  filters = {}
) {
  // Prefer ISBN for exact matching; fall back to title
  const searchTerm = isbn || bookTitle
  const { availableNow = false, formatType = '' } = filters
  const encoded = encodeURIComponent(searchTerm)

  const pattern = (district.customSearchPattern || '').toLowerCase()
  const id = district.id

  // ─── LAPL (ls2pac) ───
  if (pattern.includes('ls2pac.lapl.org') || id === 'lapl') {
    let url = `https://ls2pac.lapl.org/?section=search&term=${encoded}&page=0&pageSize=10&sortKey=Relevancy&db=ls2pac`
    const facets = []
    if (formatType) {
      const map = { book: 'Book', audiobook: 'Audiobook', ebook: 'eBook', eaudiobook: 'eAudiobook', cd: 'Music CD' }
      if (map[formatType]) facets.push({ facetDisplay: map[formatType], facetValue: map[formatType], facetName: 'Format' })
    }
    url += `&facetFilters=${encodeURIComponent(JSON.stringify(facets))}`
    return url
  }

  // ─── PVLD (Sirsi - palos.ent.sirsi.net) ───
  if (id === 'pvld' || pattern.includes('palos.ent.sirsi.net')) {
    let url = `https://palos.ent.sirsi.net/client/en_US/default/search/results?qu=${encoded}&te=ILS`
    if (formatType) {
      const map = { book: 'ITYPE\tMaterial Type\t1:BOOK\tBook - Adult', audiobook: 'ITYPE\tMaterial Type\t1:AUDIOBOOK\tAudiobook', ebook: 'ITYPE\tMaterial Type\t1:EBOOK\teBook' }
      if (map[formatType]) url += `&qf=${encodeURIComponent(map[formatType])}`
    }
    if (availableNow) url += '&av=0'
    return url
  }

  // ─── LA County Library (Sirsi) ───
  if (id === 'lacounty' || pattern.includes('lacountylibrary.org')) {
    let url = `https://catalog.lacountylibrary.org/client/en_US/default/search/results?qu=${encoded}&ic=true&te=`
    if (formatType) {
      const map = { book: 'ITYPE\tMaterial Type\t1:BOOK\tBook', audiobook: 'ITYPE\tMaterial Type\t1:AUDIOBOOK\tAudiobook', ebook: 'ITYPE\tMaterial Type\t1:EBOOK\teBook' }
      if (map[formatType]) url += `&qf=${encodeURIComponent(map[formatType])}`
    }
    if (availableNow) url += '&av=0'
    return url
  }

  // ─── Redondo Beach (Sirsi) — uses FORMAT facet key, not ITYPE ───
  if (id === 'redondobeach' || pattern.includes('redon.ent.sirsi.net')) {
    let url = `https://redon.ent.sirsi.net/client/en_US/default/search/results?qu=${encoded}&te=&dt=list`
    if (formatType) {
      const map = { book: 'FORMAT\tFormat\tBOOK\tBook', audiobook: 'FORMAT\tFormat\tAB\tAudiobook', ebook: 'FORMAT\tFormat\tE_BOOK\teBook' }
      if (map[formatType]) url += `&qf=${encodeURIComponent(map[formatType])}`
    }
    if (availableNow) url += '&av=0'
    return url
  }

  // ─── Polaris systems (Torrance, Downey, etc.) ───
  // Each library has its own full Polaris URL stored in customSearchPattern
  if (pattern.includes('polarislibrary.com')) {
    return district.customSearchPattern.replace('{QUERY}', encoded)
  }

  // ─── Vega / iii systems (Long Beach na5, El Segundo na4, etc.) ───
  if (pattern.includes('iiivega.com')) {
    let url = district.customSearchPattern.replace('{QUERY}', encoded)
    if (!url.includes('pageNum=')) url += '&pageNum=0'
    if (formatType) {
      const map = { book: '1', audiobook: '3', ebook: '10', eaudiobook: '11', cd: '4' }
      if (map[formatType]) url += `&materialTypeIds=${map[formatType]}`
    }
    if (availableNow) url += '&universalLimiterIds=at_library'
    return url
  }

  // ─── Biblionix systems (session-based — can't embed search queries) ───
  if (pattern.includes('biblionix.com')) {
    // Return the catalog homepage as-is; user must search manually
    return district.customSearchPattern
  }

  // ─── BiblioCommons systems ───
  // Correct filter params: f_FORMAT=BK (book) and f_STATUS=_physical_ (available)
  if (pattern.includes('bibliocommons.com')) {
    let url = district.customSearchPattern.replace('{QUERY}', encoded)
    // Filters require keyword search type (not smart)
    if (formatType || availableNow) {
      url = url.replace('searchType=smart', 'searchType=keyword')
    }
    if (formatType) {
      const map = { book: 'BK', audiobook: 'AB', ebook: 'EBOOK', eaudiobook: 'EAUDIO', cd: 'MU' }
      if (map[formatType]) url += `&f_FORMAT=${map[formatType]}`
    }
    if (availableNow) url += '&f_STATUS=_physical_'
    return url
  }

  // ─── Koha OPAC (Altadena) ───
  if (pattern.includes('cgi-bin/koha')) {
    let url = district.customSearchPattern.replace('{QUERY}', encoded)
    if (availableNow) url += '&limit=available'
    if (formatType === 'book') url += '&limit=itype:BOOK&sort_by=relevance'
    else if (formatType === 'ebook') url += '&limit=itype:CLOUDLIB'
    return url
  }

  // ─── Arcadia VuFind ───
  if (id === 'arcadia' || pattern.includes('discovery.arcadialibrary.org')) {
    const activeFilters = []
    if (availableNow) activeFilters.push('availability_toggle%3A%22available%22')
    if (formatType === 'book') activeFilters.push('format_category%3A%22Books%22')
    if (activeFilters.length) {
      return `https://discovery.arcadialibrary.org/Search/Results?lookfor=${encoded}&searchIndex=Keyword&sort=relevance&view=list&searchSource=local&${activeFilters.map(f => `filter%5B%5D=${f}`).join('&')}`
    }
    return `https://discovery.arcadialibrary.org/Union/Search?view=list&showCovers=on&lookfor=${encoded}&searchIndex=Keyword&searchSource=local`
  }

  // ─── Cerritos (III Millennium) ───
  if (id === 'cerritos' || pattern.includes('catalog.cerritos.gov')) {
    if (formatType === 'book') {
      return `https://catalog.cerritos.gov/search/X?SEARCH=(${encoded})&SORT=D&m=a`
    }
    return `https://catalog.cerritos.gov/search/?searchtype=X&SORT=D&searcharg=${encoded}`
  }

  // ─── Other Sirsi Enterprise systems (generic ent.sirsi.net) ───
  if (pattern.includes('ent.sirsi.net')) {
    let url = district.customSearchPattern.replace('{QUERY}', encoded)
    if (formatType) {
      const map = { book: 'ITYPE\tMaterial Type\t1:BOOK\tBook', audiobook: 'ITYPE\tMaterial Type\t1:AUDIOBOOK\tAudiobook', ebook: 'ITYPE\tMaterial Type\t1:EBOOK\teBook' }
      if (map[formatType]) url += `&qf=${encodeURIComponent(map[formatType])}`
    }
    if (availableNow) url += '&av=0'
    return url
  }

  // ─── Generic fallback ───
  if (district.customSearchPattern) {
    return district.customSearchPattern.replace('{QUERY}', encoded)
  }

  if (district.searchUrl) {
    const separator = district.searchUrl.includes('?') ? '&' : '?'
    return `${district.searchUrl}${separator}q=${encoded}`
  }

  return district.website
}

/**
 * Returns true if this library's catalog supports a direct search URL
 * (i.e. can pre-fill the book title in the search box).
 * Session-based catalogs (Biblionix, some Biblionix-style) cannot.
 */
export function libraryCanAutoSearch(district) {
  return (district.customSearchPattern || '').includes('{QUERY}')
}
