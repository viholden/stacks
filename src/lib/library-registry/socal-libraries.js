/**
 * Southern California Library Registry
 * Starting with LA County and South Bay libraries
 */

import { LibraryDistrict } from './types.js'

export const SOCAL_LIBRARIES = [
  // Los Angeles Public Library (already have adapter)
  {
    id: 'lapl',
    name: 'Los Angeles Public Library',
    shortName: 'LAPL',
    website: 'https://www.lapl.org',
    adapterType: 'lapl',
    branches: [
      {
        id: 'lapl-central',
        name: 'Central Library',
        districtId: 'lapl',
        location: {
          lat: 34.0484,
          lng: -118.2574,
          address: '630 W 5th St',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90071',
        },
      },
      {
        id: 'lapl-san-pedro',
        name: 'San Pedro Regional Branch',
        districtId: 'lapl',
        location: {
          lat: 33.7424,
          lng: -118.2924,
          address: '931 S Gaffey St',
          city: 'San Pedro',
          state: 'CA',
          zipCode: '90731',
        },
      },
    ],
  },
  
  // Palos Verdes Library District
  {
    id: 'pvld',
    name: 'Palos Verdes Library District',
    shortName: 'PVLD',
    website: 'https://pvld.org',
    adapterType: 'generic',
    searchUrl: 'https://catalog.pvld.org/search/results',
    customSearchPattern: 'https://catalog.pvld.org/search/results?query={QUERY}',
    branches: [
      {
        id: 'pvld-miraleste',
        name: 'Miraleste Library',
        districtId: 'pvld',
        location: {
          lat: 33.7647,
          lng: -118.3425,
          address: '29089 Palos Verdes Dr E',
          city: 'Rancho Palos Verdes',
          state: 'CA',
          zipCode: '90275',
        },
      },
      {
        id: 'pvld-malaga-cove',
        name: 'Malaga Cove Library',
        districtId: 'pvld',
        location: {
          lat: 33.7891,
          lng: -118.3942,
          address: '2400 Via Campesina',
          city: 'Palos Verdes Estates',
          state: 'CA',
          zipCode: '90274',
        },
      },
      {
        id: 'pvld-peninsula-center',
        name: 'Peninsula Center Library',
        districtId: 'pvld',
        location: {
          lat: 33.7444,
          lng: -118.3635,
          address: '701 Silver Spur Rd',
          city: 'Rolling Hills Estates',
          state: 'CA',
          zipCode: '90274',
        },
      },
    ],
  },
  
  // County of Los Angeles Public Library (different from LAPL)
  {
    id: 'lacounty',
    name: 'County of Los Angeles Public Library',
    shortName: 'LA County Library',
    website: 'https://lacountylibrary.org',
    adapterType: 'generic',
    searchUrl: 'https://lacolib.biblionix.com/catalog',
    customSearchPattern: 'https://lacolib.biblionix.com/catalog/?searchterm={QUERY}',
    branches: [
      {
        id: 'lacounty-lomita',
        name: 'Lomita Library',
        districtId: 'lacounty',
        location: {
          lat: 33.7919,
          lng: -118.3154,
          address: '24200 Narbonne Ave',
          city: 'Lomita',
          state: 'CA',
          zipCode: '90717',
        },
      },
      {
        id: 'lacounty-torrance',
        name: 'Torrance Library',
        districtId: 'lacounty',
        location: {
          lat: 33.8358,
          lng: -118.3406,
          address: '3301 Torrance Blvd',
          city: 'Torrance',
          state: 'CA',
          zipCode: '90503',
        },
      },
    ],
  },
  
  // Long Beach Public Library
  {
    id: 'lbpl',
    name: 'Long Beach Public Library',
    shortName: 'Long Beach Library',
    website: 'https://www.longbeach.gov/library',
    adapterType: 'generic',
    searchUrl: 'https://lbpl.ent.sirsi.net/client/en_US/lbpl',
    customSearchPattern: 'https://lbpl.ent.sirsi.net/client/en_US/lbpl/search/results?qu={QUERY}',
    branches: [
      {
        id: 'lbpl-main',
        name: 'Main Library',
        districtId: 'lbpl',
        location: {
          lat: 33.7701,
          lng: -118.1937,
          address: '101 Pacific Ave',
          city: 'Long Beach',
          state: 'CA',
          zipCode: '90802',
        },
      },
    ],
  },
  
  // Torrance Public Library
  {
    id: 'torrance',
    name: 'Torrance Public Library',
    shortName: 'Torrance',
    website: 'https://www.torranceca.gov/our-city/community-services/library',
    adapterType: 'generic',
    searchUrl: 'https://torrance.polarislibrary.com',
    customSearchPattern: 'https://torrance.polarislibrary.com/polaris/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term={QUERY}',
    branches: [
      {
        id: 'torrance-katy-geissert',
        name: 'Katy Geissert Civic Center Library',
        districtId: 'torrance',
        location: {
          lat: 33.8358,
          lng: -118.3406,
          address: '3301 Torrance Blvd',
          city: 'Torrance',
          state: 'CA',
          zipCode: '90503',
        },
      },
    ],
  },
  
  // Santa Monica Public Library
  {
    id: 'smpl',
    name: 'Santa Monica Public Library',
    shortName: 'Santa Monica',
    website: 'https://smpl.org',
    adapterType: 'generic',
    searchUrl: 'https://smpl.ent.sirsi.net/client/en_US/default',
    customSearchPattern: 'https://smpl.ent.sirsi.net/client/en_US/default/search/results?qu={QUERY}',
    branches: [
      {
        id: 'smpl-main',
        name: 'Main Library',
        districtId: 'smpl',
        location: {
          lat: 34.0145,
          lng: -118.4813,
          address: '601 Santa Monica Blvd',
          city: 'Santa Monica',
          state: 'CA',
          zipCode: '90401',
        },
      },
    ],
  },
  
  // Pasadena Public Library
  {
    id: 'pasadena',
    name: 'Pasadena Public Library',
    shortName: 'Pasadena',
    website: 'https://www.cityofpasadena.net/library',
    adapterType: 'generic',
    searchUrl: 'https://catalog.pasadena.gov',
    customSearchPattern: 'https://catalog.pasadena.gov/search/?searchtype=X&SORT=D&searcharg={QUERY}',
    branches: [
      {
        id: 'pasadena-central',
        name: 'Central Library',
        districtId: 'pasadena',
        location: {
          lat: 34.1454,
          lng: -118.1488,
          address: '285 E Walnut St',
          city: 'Pasadena',
          state: 'CA',
          zipCode: '91101',
        },
      },
    ],
  },
  
  // Glendale Public Library
  {
    id: 'glendale',
    name: 'Glendale Public Library',
    shortName: 'Glendale',
    website: 'https://www.glendaleca.gov/government/departments/library',
    adapterType: 'generic',
    searchUrl: 'https://glendaleca.gov/library',
    customSearchPattern: 'https://gpl.ent.sirsi.net/client/en_US/glendale/search/results?qu={QUERY}',
    branches: [
      {
        id: 'glendale-central',
        name: 'Central Library',
        districtId: 'glendale',
        location: {
          lat: 34.1425,
          lng: -118.2551,
          address: '222 E Harvard St',
          city: 'Glendale',
          state: 'CA',
          zipCode: '91205',
        },
      },
    ],
  },
  
  // Burbank Public Library
  {
    id: 'burbank',
    name: 'Burbank Public Library',
    shortName: 'Burbank',
    website: 'https://www.burbankca.gov/library',
    adapterType: 'generic',
    searchUrl: 'https://burbank.polarislibrary.com',
    customSearchPattern: 'https://burbank.polarislibrary.com/polaris/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term={QUERY}',
    branches: [
      {
        id: 'burbank-central',
        name: 'Central Library',
        districtId: 'burbank',
        location: {
          lat: 34.1808,
          lng: -118.3090,
          address: '110 N Glenoaks Blvd',
          city: 'Burbank',
          state: 'CA',
          zipCode: '91502',
        },
      },
    ],
  },
  
  // Orange County Public Libraries
  {
    id: 'ocpl',
    name: 'Orange County Public Libraries',
    shortName: 'OC Libraries',
    website: 'https://www.ocpl.org',
    adapterType: 'generic',
    searchUrl: 'https://ocpl.biblionix.com/catalog',
    customSearchPattern: 'https://ocpl.biblionix.com/catalog/?searchterm={QUERY}',
    branches: [
      {
        id: 'ocpl-aliso-viejo',
        name: 'Aliso Viejo Library',
        districtId: 'ocpl',
        location: {
          lat: 33.5756,
          lng: -117.7265,
          address: '1 Journey',
          city: 'Aliso Viejo',
          state: 'CA',
          zipCode: '92656',
        },
      },
      {
        id: 'ocpl-mission-viejo',
        name: 'Mission Viejo Library',
        districtId: 'ocpl',
        location: {
          lat: 33.6000,
          lng: -117.6720,
          address: '100 Civic Center',
          city: 'Mission Viejo',
          state: 'CA',
          zipCode: '92691',
        },
      },
    ],
  },
  
  // San Diego Public Library
  {
    id: 'sdpl',
    name: 'San Diego Public Library',
    shortName: 'San Diego',
    website: 'https://www.sandiego.gov/public-library',
    adapterType: 'generic',
    searchUrl: 'https://sandiego.bibliocommons.com',
    customSearchPattern: 'https://sandiego.bibliocommons.com/v2/search?query={QUERY}',
    branches: [
      {
        id: 'sdpl-central',
        name: 'Central Library',
        districtId: 'sdpl',
        location: {
          lat: 32.7157,
          lng: -117.1611,
          address: '330 Park Blvd',
          city: 'San Diego',
          state: 'CA',
          zipCode: '92101',
        },
      },
    ],
  },
  
  // Anaheim Public Library
  {
    id: 'anaheim',
    name: 'Anaheim Public Library',
    shortName: 'Anaheim',
    website: 'https://www.anaheim.net/346/Library',
    adapterType: 'generic',
    searchUrl: 'https://anaheimlibrary.org',
    customSearchPattern: 'https://apl.ent.sirsi.net/client/en_US/anaheim/search/results?qu={QUERY}',
    branches: [
      {
        id: 'anaheim-central',
        name: 'Central Library',
        districtId: 'anaheim',
        location: {
          lat: 33.8366,
          lng: -117.9143,
          address: '500 W Broadway',
          city: 'Anaheim',
          state: 'CA',
          zipCode: '92805',
        },
      },
    ],
  },
]
