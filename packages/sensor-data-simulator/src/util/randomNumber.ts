/**
 * Generates a random number based on the normal distribution using the Box-Muller transform.
 * @param mean - Mean value of the normal distribution.
 * @param std - Standard deviation of the normal distribution.
 * @returns A random number based on the specified normal distribution.
 */
export function generateRandomNumber(mean: number, std: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * std + mean;
}
