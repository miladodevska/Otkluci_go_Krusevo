import { useNavigate } from 'react-router-dom'
import tympanonCardUnlocked from '../../assets/icons/tympanon-card-unlocked.svg'
import tympanonCardLocked from '../../assets/icons/tympanon-card-locked.svg'
import BottomNav from '../../components/BottomNav/BottomNav'
import { withUnlockedStatus } from '../../data/tympanons'
import { useUnlockedIds } from '../../hooks/useUnlockedIds'
import './Collection.css'

function Collection() {
  const navigate = useNavigate()
  const unlockedIds = useUnlockedIds()
  const tympanons = withUnlockedStatus(unlockedIds)
  const unlockedCount = tympanons.filter((t) => t.status === 'unlocked').length

  let unlockedSeen = 0

  return (
    <div className="collection-screen">
      <div className="collection-screen__header">
        <h1 className="collection-screen__title">Мојата колекција</h1>
        <div className="collection-screen__progress-chip">
          {unlockedCount} / {tympanons.length}
        </div>
      </div>

      <p className="collection-screen__section-label">ОТКЛУЧЕНИ ТИМПАНОНИ</p>

      <div className="collection-screen__grid">
        {tympanons.map((point, index) => {
          const isLast = index === tympanons.length - 1
          const isOddTotal = tympanons.length % 2 === 1
          const cardClassName =
            isLast && isOddTotal
              ? 'collection-card collection-card--centered'
              : 'collection-card'

          if (point.status === 'unlocked') {
            unlockedSeen += 1
            return (
              <button
                key={point.id}
                className={`${cardClassName} collection-card--unlocked`}
                type="button"
                onClick={() => navigate(`/point/${point.id}/story`)}
              >
                <span className="collection-card__badge">{unlockedSeen}</span>
                <img
                  className={`collection-card__icon${point.image ? ' collection-card__icon--photo' : ''}`}
                  src={point.image ?? tympanonCardUnlocked}
                  alt=""
                />
                <span className={`collection-card__name${point.image ? ' collection-card__name--overlay' : ''}`}>
                  <span className="collection-card__key" aria-hidden="true">
                    🔑
                  </span>
                  {point.name}
                </span>
              </button>
            )
          }

          return (
            <div key={point.id} className={`${cardClassName} collection-card--locked`}>
              <img
                className={`collection-card__icon${point.image ? ' collection-card__icon--photo collection-card__icon--locked-photo' : ''}`}
                src={point.image ?? tympanonCardLocked}
                alt=""
              />
              <span className="collection-card__lock" aria-hidden="true">
                🔒
              </span>
              {!point.image && <span className="collection-card__question">?</span>}
            </div>
          )
        })}
      </div>

      <BottomNav />
    </div>
  )
}

export default Collection
