import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import iconSave from '../../assets/icons/icon-save.svg'
import iconMap from '../../assets/icons/icon-map.svg'
import { tympanons } from '../../data/tympanons'
import './Capture.css'

function Capture() {
  const navigate = useNavigate()
  const { id } = useParams()
  const point = tympanons.find((t) => t.id === id)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!photo) return
    navigate(`/point/${id}/success`)
  }

  return (
    <div className="capture-screen">
      <button className="capture-screen__back" type="button" onClick={() => navigate(-1)} aria-label="Назад">
        ←
      </button>
      <h1 className="capture-screen__title">{point ? point.name : 'Најде тимпанон?'}</h1>

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
            disabled={!photo}
            aria-label="Зачувај"
          >
            <img src={iconSave} alt="" />
          </button>
          <span className="capture-screen__label">Зачувај</span>
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
