import { useNavigate } from 'react-router-dom'
import rewardQr from '../../assets/icons/reward-qr.svg'
import trophy from '../../assets/icons/trophy.png'
import './Completed.css'

const DEFAULT_NICKNAME = 'МалАвантурист'

function Completed() {
  const navigate = useNavigate()
  const nickname = localStorage.getItem('nickname') || DEFAULT_NICKNAME

  const handleShare = () => {
    const shareData = {
      title: 'Отклучи го Крушево',
      text: 'Ја освоив потрагата „Отклучи го Крушево“ и ги најдов сите 7 тимпанони!',
    }

    if (navigator.share) {
      navigator.share(shareData).catch(() => {})
    }
  }

  return (
    <div className="completed-screen">
      <div className="completed-screen__stars" aria-hidden="true">
        <span className="completed-screen__star completed-screen__star--1">✦</span>
        <span className="completed-screen__star completed-screen__star--2">✦</span>
        <span className="completed-screen__star completed-screen__star--3">✦</span>
        <span className="completed-screen__star completed-screen__star--4">✦</span>
        <span className="completed-screen__star completed-screen__star--5">✦</span>
        <span className="completed-screen__star completed-screen__star--6">✦</span>
        <span className="completed-screen__star completed-screen__star--7">✦</span>
        <span className="completed-screen__star completed-screen__star--8">✦</span>
        <span className="completed-screen__star completed-screen__star--9">✦</span>
        <span className="completed-screen__star completed-screen__star--10">✦</span>
      </div>

      <img className="completed-screen__trophy" src={trophy} alt="Трофеј" />

      <h1 className="completed-screen__title">Ја освои потрагата!</h1>

      <p className="completed-screen__subtitle">
        Ги најде сите 7 тимпанони од Крушево!
        <br />
        Покажи го кодот на инфо-пултот за да ја подигнеш твојата награда.
      </p>

      <img className="completed-screen__qr" src={rewardQr} alt="QR код за подигнување на награда" />

      <p className="completed-screen__username">Корисничко име: {nickname}</p>

      <div className="completed-screen__info-card">
        <p>📍 Инфо-пулт: Плоштад Никола Карев</p>
        <p>Работно време: 09:00 – 17:00</p>
      </div>

      <button className="completed-screen__share" type="button" onClick={handleShare}>
        ↑ Сподели го достигнувањето
      </button>

      <button className="completed-screen__back" type="button" onClick={() => navigate('/map')}>
        Назад кон мапата
      </button>
    </div>
  )
}

export default Completed
