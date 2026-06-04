export const quadrants = [
  { key: 'A', color: '#FF0000' },
  { key: 'B', color: '#007BFF' },
  { key: 'C', color: '#FFC107' },
  { key: 'D', color: '#28A745' },
]

export const VALID_KEYS = new Set(quadrants.map((q) => q.key))

export function getQuadrant(key) {
  return quadrants.find((q) => q.key === key) ?? null
}
