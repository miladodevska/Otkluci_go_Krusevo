export interface LatLng {
  lat: number
  lng: number
}

const EARTH_RADIUS_M = 6371000

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function distanceInMeters(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat)
  const dLng = toRadians(b.lng - a.lng)
  const lat1 = toRadians(a.lat)
  const lat2 = toRadians(b.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)

  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h))
}
