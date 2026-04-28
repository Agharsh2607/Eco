// CO2 emission factors (kg per km)
const CO2_FACTORS = {
  petrol: 0.171,
  diesel: 0.192,
  ev: 0.05,
  public: 0.08
};

// Fuel consumption: distance / efficiency = litres (or kWh for EV)
const FUEL_EFFICIENCY = {
  petrol: 15,  // km per litre
  diesel: 18,
  ev: 6,       // km per kWh
  public: 35
};

function calculateCarbon(distanceKm, vehicleType) {
  const vt = vehicleType.toLowerCase();
  const factor = CO2_FACTORS[vt] || CO2_FACTORS.petrol;
  const efficiency = FUEL_EFFICIENCY[vt] || FUEL_EFFICIENCY.petrol;

  const co2Kg = Math.round(distanceKm * factor * 100) / 100;
  const fuelUsed = Math.round((distanceKm / efficiency) * 100) / 100;

  return { co2Kg, fuelUsed, vehicleType: vt };
}

function calculateEcoScore(co2Kg, distanceKm) {
  // Normalize: petrol baseline is the "worst" (0.171 kg/km)
  const maxCo2 = distanceKm * CO2_FACTORS.petrol;
  const score = Math.min(100, Math.max(5, Math.round((1 - co2Kg / maxCo2) * 85 + 15)));
  return score;
}

function buildRouteComparison(baseDistance, baseDuration, vehicleType) {
  const vt = vehicleType.toLowerCase();

  const routes = [
    {
      type: 'Fastest Route',
      icon: '🚀',
      distanceKm: Math.round(baseDistance * 1.08),
      durationMin: Math.round(baseDuration * 0.88)
    },
    {
      type: 'Shortest Route',
      icon: '📏',
      distanceKm: Math.round(baseDistance * 0.94),
      durationMin: Math.round(baseDuration * 1.12)
    },
    {
      type: 'Eco-Friendly Route',
      icon: '🌿',
      distanceKm: Math.round(baseDistance * 1.0),
      durationMin: Math.round(baseDuration * 1.0),
      recommended: true
    }
  ];

  // Calculate carbon & eco score for each route
  // Eco route gets a 20% CO2 reduction factor (optimized driving)
  routes.forEach(r => {
    const ecoMultiplier = r.recommended ? 0.80 : 1.0;
    const carbon = calculateCarbon(r.distanceKm, vt);
    r.fuelUsed = Math.round(carbon.fuelUsed * (r.recommended ? 0.85 : 1.0) * 100) / 100;
    r.co2Kg = Math.round(carbon.co2Kg * ecoMultiplier * 100) / 100;
    r.ecoScore = calculateEcoScore(r.co2Kg, r.distanceKm);
    r.timeFormatted = `${Math.floor(r.durationMin / 60)}h ${r.durationMin % 60}m`;
  });

  // Savings: eco route vs petrol baseline
  const petrolBaseline = calculateCarbon(baseDistance, 'petrol');
  const ecoRoute = routes.find(r => r.recommended);
  const co2Saved = Math.round((petrolBaseline.co2Kg - ecoRoute.co2Kg) * 100) / 100;
  const fuelSaved = Math.round((petrolBaseline.fuelUsed - ecoRoute.fuelUsed) * 100) / 100;

  return {
    routes,
    recommended: ecoRoute,
    savings: {
      co2Saved: Math.max(0, co2Saved),
      fuelSaved: Math.max(0, fuelSaved),
      comparedTo: 'petrol baseline'
    }
  };
}

module.exports = { calculateCarbon, calculateEcoScore, buildRouteComparison, CO2_FACTORS, FUEL_EFFICIENCY };
