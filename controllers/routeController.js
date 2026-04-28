const { getRouteData } = require('../utils/routeService');
const { buildRouteComparison } = require('../utils/ecoCalculator');

const VALID_VEHICLES = ['petrol', 'diesel', 'ev', 'public'];

async function compareRoutes(req, res) {
  try {
    const { source, destination, vehicleType = 'petrol' } = req.body;

    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }
    const vt = vehicleType.toLowerCase();
    if (!VALID_VEHICLES.includes(vt)) {
      return res.status(400).json({ error: `Invalid vehicle type. Use: ${VALID_VEHICLES.join(', ')}` });
    }

    // Get route data (real API or fallback)
    const routeData = await getRouteData(source, destination);

    // Build 3-route comparison
    const comparison = buildRouteComparison(routeData.distanceKm, routeData.durationMin, vt);

    res.json({
      success: true,
      source: routeData.source,
      destination: routeData.destination,
      baseDistance: routeData.distanceKm,
      baseDuration: routeData.durationMin,
      vehicleType: vt,
      ...comparison,
      note: routeData.note,
      isFallback: routeData.isFallback
    });
  } catch (err) {
    console.error('Route compare error:', err.message);
    res.status(500).json({ error: 'Route comparison failed', details: err.message });
  }
}

module.exports = { compareRoutes };
