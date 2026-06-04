export const quadrants = [
  { key: 'A', color: '#e53935' },
  { key: 'B', color: '#1e88e5' },
  { key: 'C', color: '#fdd835' },
  { key: 'D', color: '#43a047' },
]

export const VALID_KEYS = new Set(quadrants.map((q) => q.key))

export function getQuadrant(key) {
  return quadrants.find((q) => q.key === key) ?? null
}
