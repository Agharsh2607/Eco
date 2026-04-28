// Deterministic distance estimator — same input always returns same output
// Uses simple hash so "Chennai → Bangalore" always gives the same distance

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function estimateDistance(source, destination) {
  const key = `${source.toLowerCase().trim()}→${destination.toLowerCase().trim()}`;
  const hash = hashString(key);

  // Classify as local (< 40km) or intercity (50–900km) based on hash
  const isLocal = (hash % 5) === 0; // ~20% chance of local
  let distanceKm;
  if (isLocal) {
    distanceKm = 3 + (hash % 38); // 3–40 km
  } else {
    distanceKm = 50 + (hash % 851); // 50–900 km
  }

  // Estimate duration
  const speed = isLocal ? 28 : 62; // km/h
  const durationMin = Math.round((distanceKm / speed) * 60);

  return { distanceKm, durationMin, isLocal, isFallback: true };
}

module.exports = { estimateDistance, hashString };
