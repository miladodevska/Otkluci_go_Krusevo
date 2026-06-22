import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import a1Logo from '../../assets/images/A1_Logo_Std_Red_Pos_3_L.png'
import markerTriangle from '../../assets/icons/marker-triangle.svg'
import progressTriangle from '../../assets/icons/progress-triangle.svg'
import BottomNav from '../../components/BottomNav/BottomNav'
import LockedPointSheet from '../../components/LockedPointSheet/LockedPointSheet'
import { withUnlockedStatus } from '../../data/tympanons'
import { useUnlockedIds } from '../../hooks/useUnlockedIds'
import { CAPTURE_RADIUS_M, NEARBY_RADIUS_M } from '../../lib/constants'
import { isDebugMode } from '../../lib/debug'
import { distanceInMeters, type LatLng } from '../../utils/geo'
import './Map.css'

const KRUSHEVO_CENTER: LatLng = { lat: 41.3717, lng: 21.2486 }

const unlockedIcon = divIcon({
  className: 'map-marker map-marker--unlocked',
  html: `<img src="${markerTriangle}" alt="" />`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const activeIcon = divIcon({
  className: 'map-marker map-marker--active',
  html: `<img src="${markerTriangle}" alt="" />`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
})

const lockedIcon = divIcon({
  className: 'map-marker map-marker--locked',
  html: '?',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

const userIcon = divIcon({
  className: 'map-marker map-marker--user',
  html: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function Map() {
  const navigate = useNavigate()
  const [userPosition, setUserPosition] = useState<LatLng | null>(null)
  const unlockedIds = useUnlockedIds()
  const tympanons = withUnlockedStatus(unlockedIds)

  useEffect(() => {
    if (!navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => setUserPosition(null),
      { enableHighAccuracy: true },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const unlockedCount = tympanons.filter((t) => t.status === 'unlocked').length

  const nearestLocked = useMemo(() => {
    const origin = userPosition ?? KRUSHEVO_CENTER
    const lockedPoints = tympanons.filter((t) => t.status === 'locked')

    return lockedPoints.map((point) => ({
        point, distance: distanceInMeters(origin, point),
      }))
      .sort((a, b) => a.distance - b.distance)[0]
  }, [userPosition, tympanons])

  const [showPreview, setShowPreview] = useState(false)

  const isHighlighted = nearestLocked && nearestLocked.distance <= NEARBY_RADIUS_M
  const canCapture = nearestLocked && (isDebugMode() || nearestLocked.distance <= CAPTURE_RADIUS_M)
  const showSheet = isHighlighted && !canCapture

  return (
    <div className="map-screen">
      <MapContainer
        className="map-screen__map"
        center={[KRUSHEVO_CENTER.lat, KRUSHEVO_CENTER.lng]}
        zoom={15}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {tympanons.map((point) => {
          let icon = lockedIcon
          if (point.status === 'unlocked') icon = unlockedIcon
          if (isHighlighted && point.id === nearestLocked.point.id) icon = activeIcon

          return <Marker key={point.id} position={[point.lat, point.lng]} icon={icon} />
        })}

        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon} />
        )}
      </MapContainer>

      <div className="map-screen__top-bar">
        <h1 className="map-screen__title">Отклучи го Крушево</h1>
        <img className="map-screen__logo" src={a1Logo} alt="A1" />
      </div>

      <div className="map-screen__progress-chip">
        <img className="map-screen__progress-icon" src={progressTriangle} alt="" />
        <span>
          {unlockedCount} / {tympanons.length} тимпанони
        </span>
      </div>

      <div className="map-screen__progress-dots">
        {tympanons.map((point, index) => (
          <span
            key={point.id}
            className={
              index < unlockedCount
                ? 'map-screen__dot map-screen__dot--filled'
                : 'map-screen__dot'
            }
          />
        ))}
      </div>

      {nearestLocked && !showSheet && (
        <div className="map-screen__nearest-card">
          <div className="map-screen__nearest-info">
            <p className="map-screen__nearest-label">НАЈБЛИСКА ТОЧКА</p>
            <p className="map-screen__nearest-name">{nearestLocked.point.name}</p>
            <p className="map-screen__nearest-distance">
              ~{Math.round(nearestLocked.distance)} м
            </p>
          </div>
          {canCapture ? (
            <button
              className="map-screen__nearest-arrow--capture"
              type="button"
              onClick={() =>
                navigate(`/point/${nearestLocked.point.id}/capture`, {
                  state: userPosition ? { location: userPosition } : undefined,
                })
              }
              aria-label="Сликај го тимпанонот"
            >
              📷
            </button>
          ) : (
            <button
              className="map-screen__nearest-arrow"
              type="button"
              onClick={() => setShowPreview(true)}
              aria-label="Прегледај ја најблиската точка"
            >
              →
            </button>
          )}
        </div>
      )}

      {showSheet && nearestLocked && <LockedPointSheet distance={nearestLocked.distance} />}

      {showPreview && nearestLocked && (
        <div className="map-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="map-preview-card" onClick={(e) => e.stopPropagation()}>
            <button className="map-preview-card__close"
              type="button" onClick={() => setShowPreview(false)} aria-label="Затвори"
            > ✕ </button>
            <img className="map-preview-card__image" src={nearestLocked.point.image} alt={nearestLocked.point.name}/>
            <div className="map-preview-card__info">
              <p className="map-preview-card__label">БАРАЈ ГО ТИМПАНОНОТ</p>
              <p className="map-preview-card__name">{nearestLocked.point.name}</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default Map
