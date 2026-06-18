import { useNavigate, useParams } from 'react-router-dom'
import { withUnlockedStatus } from '../../data/tympanons'
import { useUnlockedIds } from '../../hooks/useUnlockedIds'
import './Story.css'

function Story() {
  const navigate = useNavigate()
  const { id } = useParams()
  const unlockedIds = useUnlockedIds()
  const tympanons = withUnlockedStatus(unlockedIds)
  const point = tympanons.find((t) => t.id === id)

  const unlockedCount = tympanons.filter((t) => t.status === 'unlocked').length

  if (!point) return null

  return (
    <div className="story-screen">
      <div className="story-screen__header">
        <img className="story-screen__illustration" src={point.headerImage} alt="" />

        <button
          className="story-screen__back"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Назад"
        >  ←  </button>

        <div className="story-screen__progress-chip">
          {unlockedCount} / {tympanons.length}
        </div>

        <h1 className="story-screen__title">{point.name}</h1>
        <p className="story-screen__subtitle">{point.subtitle}</p>
      </div>

      <div className="story-screen__content">
        <h2 className="story-screen__heading">{point.storyTitle}</h2>
        <p className="story-screen__body">{point.story}</p>
      </div>

      <button className="story-screen__cta" type="button" onClick={() => navigate('/map')}>
        ← Назад кон мапата
      </button>
    </div>
  )
}

export default Story
