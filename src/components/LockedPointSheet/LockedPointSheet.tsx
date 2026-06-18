import tympanonLocked from '../../assets/icons/tympanon-locked.svg'
import { NEARBY_RADIUS_M } from '../../lib/constants'
import './LockedPointSheet.css'

interface LockedPointSheetProps {
  distance: number
}

function LockedPointSheet({ distance }: LockedPointSheetProps) {
  const progress = Math.max(
    0,
    Math.min(1, (NEARBY_RADIUS_M - distance) / NEARBY_RADIUS_M),
  )

  return (
    <div className="locked-sheet">
      <div className="locked-sheet__handle" />

      <img className="locked-sheet__icon" src={tympanonLocked} alt="" />
      <p className="locked-sheet__question">?</p>

      <h2 className="locked-sheet__title">Блиску си!</h2>
      <p className="locked-sheet__subtitle">
        Приближи се до точката за да можеш
        <br />
        да го фотографираш тимпанонот
      </p>

      <div className="locked-sheet__progress-track">
        <div
          className="locked-sheet__progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="locked-sheet__progress-labels">
        <span>0 м</span>
        <span>{NEARBY_RADIUS_M} м</span>
      </div>

      <button className="locked-sheet__cta" type="button" disabled>
        📷 Сликај го тимпанонот
      </button>
    </div>
  )
}

export default LockedPointSheet
