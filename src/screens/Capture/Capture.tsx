import { useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import iconSave from '../../assets/icons/icon-save.svg'
import iconMap from '../../assets/icons/icon-map.svg'
import { tympanons } from '../../data/tympanons'
import { CAPTURE_RADIUS_M } from '../../lib/constants'
import { isDebugMode } from '../../lib/debug'
import { getPlayerId } from '../../lib/playerId'
import { unlockTympanon } from '../../lib/progress'
import { distanceInMeters, getCurrentPosition, type LatLng } from '../../utils/geo'
import './Capture.css'

const DEFAULT_NICKNAME = 'МалАвантурист'

function Capture() {
  const navigate = useNavigate()
  const { id } = useParams()
  const routerLocation = useLocation()
  const mapLocation = (routerLocation.state as { location?: LatLng } | null)?.location
  const point = tympanons.find((t) => t.id === id)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!photo || !id || !point || isSaving) return
    setIsSaving(true)
    setError(null)

    let location = mapLocation
    if (!location) {
      try {
        location = await getCurrentPosition()
      } catch {
        if (!isDebugMode()) {
          setError('Не можеме да ја потврдиме локацијата. Овозможи локациски услуги на уредот и пробај пак.')
          setIsSaving(false)
          return
        }
        location = { lat: point.lat, lng: point.lng }
      }
    }

    if (!isDebugMode()) {
      const distance = distanceInMeters(location, { lat: point.lat, lng: point.lng })
      if (distance > CAPTURE_RADIUS_M) {
        setError(
          `Далеку си од тимпанонот (~${Math.round(distance)} м). Приближи се и пробај пак.`,
        )
        setIsSaving(false)
        return
      }
    }

    try {
      const playerId = getPlayerId()
      const nickname = localStorage.getItem('nickname') || DEFAULT_NICKNAME
      await unlockTympanon(playerId, nickname, id, photo, location)
      navigate(`/point/${id}/success`)
    } catch {
      setError('Неуспешно зачувување. Провери интернет конекција и пробај пак.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="capture-screen">
      <button className="capture-screen__back" type="button" onClick={() => navigate(-1)} aria-label="Назад">
        ←
      </button>
      <h1 className="capture-screen__title">{point ? point.name : 'Најде тимпанон?'}</h1>
      {error && <p className="capture-screen__error">{error}</p>}

      <div className="capture-screen__preview">
        {photo ? (<img className="capture-screen__photo" src={photo} alt="Сликан тимпанон" />) : (
          <div className="capture-screen__placeholder">
            <span className="capture-screen__placeholder-icon" aria-hidden="true"> 📷</span>
            <p className="capture-screen__placeholder-text">
              Насочи ја камерата кон тимпанонот <br />и притисни „Сликај"
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        className="capture-screen__file-input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />

      <div className="capture-screen__control-bar">
        <div className="capture-screen__action">
          <button
            className="capture-screen__btn"
            type="button"
            onClick={handleSave}
            disabled={!photo || isSaving}
            aria-label="Зачувај"
          >
            <img src={iconSave} alt="" />
          </button>
          <span className="capture-screen__label">{isSaving ? 'Се зачувува…' : 'Зачувај'}</span>
        </div>

        <div className="capture-screen__action">
          <button
            className="capture-screen__shutter"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Сликај"
          >
            <span className="capture-screen__shutter-icon" aria-hidden="true">
              📷
            </span>
          </button>
          <span className="capture-screen__label">{photo ? 'Сликај повторно' : 'Сликај'}</span>
        </div>

        <div className="capture-screen__action">
          <button
            className="capture-screen__btn"
            type="button"
            onClick={() => navigate('/map')}
            aria-label="Мапа"
          >
            <img src={iconMap} alt="" />
          </button>
          <span className="capture-screen__label">Мапа</span>
        </div>
      </div>
    </div>
  )
}

export default Capture
