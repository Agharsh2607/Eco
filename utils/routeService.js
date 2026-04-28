const { estimateDistance } = require('./distanceEstimator');

const USER_AGENT = process.env.APP_USER_AGENT || 'EcoTraveller/1.0 demo@ecotraveller.com';

// Dynamic import for axios (installed as dependency)
let axios;
try { axios = require('axios'); } catch { axios = null; }

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Step 1: Geocode a place name → { lat, lon } via Nominatim
async function geocode(placeName) {
  if (!axios) throw new Error('axios not installed');
  const url = 'https://nominatim.openstreetmap.org/search';
  const res = await axios.get(url, {
    params: { q: placeName, format: 'json', limit: 1 },
    headers: { 'User-Agent': USER_AGENT },
    timeout: 5000
  });
  if (!res.data || res.data.length === 0) throw new Error(`Location not found: ${placeName}`);
  return { lat: parseFloat(res.data[0].lat), lon: parseFloat(res.data[0].lon), displayName: res.data[0].display_name };
}

// Step 2: Get driving route via OSRM
async function getOSRMRoute(srcCoords, dstCoords) {
  if (!axios) throw new Error('axios not installed');
  const url = `https://router.project-osrm.org/route/v1/driving/${srcCoords.lon},${srcCoords.lat};${dstCoords.lon},${dstCoords.lat}?overview=false`;
  const res = await axios.get(url, { timeout: 8000 });
  if (!res.data || !res.data.routes || res.data.routes.length === 0) throw new Error('No route found');
  const route = res.data.routes[0];
  return {
    distanceKm: Math.round(route.distance / 1000 * 100) / 100,
    durationMin: Math.round(route.duration / 60),
    isFallback: false
  };
}

// Main function: try real APIs, fall back to estimator
async function getRouteData(source, destination) {
  try {
    const srcCoords = await geocode(source);
    await delay(1100); // Nominatim requires 1s between requests
    const dstCoords = await geocode(destination);

    const routeData = await getOSRMRoute(srcCoords, dstCoords);
    return {
      ...routeData,
      source: srcCoords.displayName,
      destination: dstCoords.displayName,
      note: 'Real route data from OpenStreetMap + OSRM'
    };
  } catch (err) {
    // Fallback to deterministic estimator
    console.log(`⚠️  API fallback for "${source}" → "${destination}": ${err.message}`);
    const estimated = estimateDistance(source, destination);
    return {
      ...estimated,
      source,
      destination,
      note: 'Fallback estimated route used (API unavailable)'
    };
  }
}

module.exports = { getRouteData, geocode };
