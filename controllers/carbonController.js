const { calculateCarbon, calculateEcoScore } = require('../utils/ecoCalculator');

const VALID_VEHICLES = ['petrol', 'diesel', 'ev', 'public'];

function calculateCarbonEndpoint(req, res) {
  try {
    const { distance, vehicleType = 'petrol' } = req.body;

    if (!distance || distance <= 0) {
      return res.status(400).json({ error: 'Valid positive distance is required' });
    }
    const vt = vehicleType.toLowerCase();
    if (!VALID_VEHICLES.includes(vt)) {
      return res.status(400).json({ error: `Invalid vehicle type. Use: ${VALID_VEHICLES.join(', ')}` });
    }

    const result = calculateCarbon(distance, vt);
    const ecoScore = calculateEcoScore(result.co2Kg, distance);

    // Compare against petrol baseline
    const petrolBaseline = calculateCarbon(distance, 'petrol');
    const co2Saved = Math.round((petrolBaseline.co2Kg - result.co2Kg) * 100) / 100;

    res.json({
      success: true,
      distance,
      vehicleType: vt,
      fuelUsed: result.fuelUsed,
      co2Emission: result.co2Kg,
      ecoScore,
      savings: {
        co2Saved: Math.max(0, co2Saved),
        comparedTo: 'petrol baseline'
      }
    });
  } catch (err) {
    console.error('Carbon calc error:', err.message);
    res.status(500).json({ error: 'Carbon calculation failed' });
  }
}

module.exports = { calculateCarbonEndpoint };
