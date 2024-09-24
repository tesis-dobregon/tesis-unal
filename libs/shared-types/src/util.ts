import { GeoPoint } from './types';

/**
 * Generates number of random geolocation points given a center and a radius.
 * Reference URL: http://goo.gl/KWcPE.
 * center A JS object with lat and lon attributes.
 * Radius in meters.
 * Returns The generated random points as an object with lat and lon attributes.
 */
export function generateRandomPoint(
  center: GeoPoint,
  radius: number
): GeoPoint {
  const x0 = center.lon;
  const y0 = center.lat;
  // Convert Radius from meters to degrees.
  const rd = radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x / Math.cos(y0);

  // Resulting point.
  return { lat: y + y0, lon: xp + x0 };
}
