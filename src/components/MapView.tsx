import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

// Centar na Krushevo
const KRUSHEVO_CENTER: [number, number] = [41.3717, 21.2458]

const userIcon = L.divIcon({
  className: 'user-marker',
  html: '<span></span>',
  iconSize: [16, 16],
})

interface TreasurePoint {
  id: string
  name: string
  position: [number, number]
  unlocked: boolean
}

const TREASURE_POINTS: TreasurePoint[] = [
  { id: '1', name: 'Старата чаршија', position: [41.3705, 21.2445], unlocked: true },
  { id: '2', name: 'Музеј Тошо Арсов', position: [41.3725, 21.2462], unlocked: false },
  { id: '3', name: 'Илинденски споменик', position: [41.3698, 21.2511], unlocked: false },
]

function RecenterOnUser({ position }: { position: [number, number] | null }) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom())
    }
  }, [position, map])

  return null
}

export default function MapView() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) return

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude])
      },
      () => {
        // Локацијата не е достапна — мапата останува центрирана на Крушево
      },
      { enableHighAccuracy: true, maximumAge: 5000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <div className="map-container">
      <MapContainer center={KRUSHEVO_CENTER} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {TREASURE_POINTS.map((point) => (
          <Marker key={point.id} position={point.position}>
            <Popup>
              {point.name}
              {point.unlocked ? ' — отклучено' : ' — заклучено'}
            </Popup>
          </Marker>
        ))}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Твоја локација</Popup>
          </Marker>
        )}

        <RecenterOnUser position={userPosition} />
      </MapContainer>
    </div>
  )
}
