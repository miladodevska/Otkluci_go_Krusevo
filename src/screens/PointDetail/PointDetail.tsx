import { useParams, useNavigate } from 'react-router-dom'
import { tympanons } from '../../data/tympanons'
import './PointDetail.css'

function PointDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const point = tympanons.find((t) => t.id === id)

  return (
    <div className="point-detail-screen">
      <button className="point-detail-screen__back" type="button" onClick={() => navigate('/map')}>
        ← Назад кон мапата
      </button>
      <h1 className="point-detail-screen__title">{point?.name ?? 'Точка'}</h1>
    </div>
  )
}

export default PointDetail
