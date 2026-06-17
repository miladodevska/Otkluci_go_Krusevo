import BottomNav from '../../components/BottomNav/BottomNav'
import { tympanons } from '../../data/tympanons'
import a1mk from '../../assets/images/A1_MK.png'
import mccann from '../../assets/images/MCCANN.png'
import ama from '../../assets/images/AMA.png'
import './Profile.css'

const DEFAULT_NICKNAME = 'МалАвантурист'

function Profile() {
  const nickname = localStorage.getItem('nickname') || DEFAULT_NICKNAME
  const unlockedCount = tympanons.filter((t) => t.status === 'unlocked').length
  const total = tympanons.length
  const progressPct = Math.round((unlockedCount / total) * 100)

  return (
    <div className="profile-screen">
      <div className="profile-screen__header">
        <div className="profile-screen__avatar">
          <span aria-hidden="true">👤</span>
        </div>
        <h1 className="profile-screen__username">{nickname}</h1>
        <p className="profile-screen__subtitle">Корисничко име</p>
      </div>

      <div className="profile-screen__body">
        <p className="profile-screen__section-label">МОЈОТ НАПРЕДОК</p>

        <div className="profile-screen__stats-card">
          <div className="profile-screen__stats-row">
            <span className="profile-screen__stats-number">{unlockedCount}</span>
            <span className="profile-screen__stats-label">/ {total} тимпанони</span>
            <span className="profile-screen__stats-chip">
              {unlockedCount} / {total}
            </span>
          </div>
          <div className="profile-screen__progress-track">
            <div
              className="profile-screen__progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <p className="profile-screen__section-label">ИНФОРМАЦИИ</p>

        <div className="profile-screen__info-card">
          <div className="profile-screen__info-row">
            <span aria-hidden="true">📍</span>
            <span>Крушево, Македонија</span>
          </div>
          <div className="profile-screen__info-divider" />
          <div className="profile-screen__info-row">
            <span aria-hidden="true">🔑</span>
            <span>Отклучени тимпанони: {unlockedCount} / {total}</span>
          </div>
        </div>

        <div className="profile-screen__powered-by">
          <p className="profile-screen__powered-by-label">Powered by:</p>
          <img className="profile-screen__powered-by-a1mk" src={a1mk} alt="A1 Македонија" />
          <div className="profile-screen__powered-by-row">
            <img className="profile-screen__powered-by-mccann" src={mccann} alt="McCann" />
            <img className="profile-screen__powered-by-ama" src={ama} alt="AMA Group" />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Profile
