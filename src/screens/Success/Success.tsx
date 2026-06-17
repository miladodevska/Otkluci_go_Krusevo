import { useNavigate, useParams } from 'react-router-dom'
import tympanonHero from '../../assets/icons/tympanon-hero.svg'
import { tympanons } from '../../data/tympanons'
import './Success.css'

function Success() {
  const navigate = useNavigate()
  const { id } = useParams()
  const point = tympanons.find((t) => t.id === id)

  const unlockedCount =
    tympanons.filter((t) => t.status === 'unlocked').length + (point?.status === 'locked' ? 1 : 0)

  return (
    <div className="success-screen">
      <div className="success-screen__confetti" aria-hidden="true">
        <span className="success-screen__dot success-screen__dot--1" />
        <span className="success-screen__dot success-screen__dot--2" />
        <span className="success-screen__dot success-screen__dot--3" />
        <span className="success-screen__dot success-screen__dot--4" />
        <span className="success-screen__dot success-screen__dot--5" />
        <span className="success-screen__dot success-screen__dot--6" />
        <span className="success-screen__dot success-screen__dot--7" />
        <span className="success-screen__dot success-screen__dot--8" />
        <span className="success-screen__dot success-screen__dot--9" />
        <span className="success-screen__dot success-screen__dot--10" />
        <span className="success-screen__dot success-screen__dot--11" />
      </div>

      <div className="success-screen__key-chip">🔑 +1 Дигитален клуч!</div>

      <img className="success-screen__hero" src={tympanonHero} alt="" />

      <h1 className="success-screen__title">Отклучи нова приказна!</h1>

      <div className="success-screen__progress-chip">
        🏛 {unlockedCount} / {tympanons.length} тимпанони
      </div>

      <div className="success-screen__progress-dots">
        {tympanons.map((t, index) => (
          <span
            key={t.id}
            className={
              index < unlockedCount
                ? 'success-screen__dot-indicator success-screen__dot-indicator--filled'
                : 'success-screen__dot-indicator'
            }
          />
        ))}
      </div>

      <button
        className="success-screen__cta"
        type="button"
        onClick={() => navigate(`/point/${id}/story`)}
      >
        Прочитај ја приказната →
      </button>

      <button className="success-screen__back" type="button" onClick={() => navigate('/map')}>
        Назад кон мапата
      </button>
    </div>
  )
}

export default Success
