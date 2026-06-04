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

export function parseSignal(value) {
  if (value == null) return null

  if (typeof value === 'string' && VALID_KEYS.has(value)) {
    return { number: 1, key: value }
  }

  if (typeof value === 'object' && VALID_KEYS.has(value.key)) {
    const number = Number(value.number)
    return {
      number: Number.isFinite(number) && number > 0 ? Math.floor(number) : 1,
      key: value.key,
    }
  }

  return null
}

export function formatSignalLabel(signal) {
  if (!signal) return ''
  return `${signal.number}.${signal.key}`
}
