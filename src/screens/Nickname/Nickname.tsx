import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import a1Logo from '../../assets/images/A1_Logo_Std_White_Neg_3_L.png'
import './Nickname.css'

const MAX_LENGTH = 20

function Nickname() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')

  return (
    <div className="nickname">
      <section className="nickname__hero">
        <img className="nickname__logo" src={a1Logo} alt="A1" />
        <h1 className="nickname__app-title">Отклучи го Крушево</h1>
      </section>

      <section className="nickname__card">
        <h2 className="nickname__title">
          Кој си ти,
          <br />
          Шерлок?
        </h2>
        <p className="nickname__subtitle">
          Внеси прекар — тоа ќе биде
          <br />
          твојот идентитет низ потрагата.
        </p>

        <label className="nickname__label" htmlFor="nickname-input">
          ПРЕКАР
        </label>
        <input
          id="nickname-input"
          className="nickname__input"
          type="text"
          placeholder="на пр. МалАвантурист"
          value={nickname}
          maxLength={MAX_LENGTH}
          onChange={(event) => setNickname(event.target.value)}
        />
        <p className="nickname__counter">
          {nickname.length} / {MAX_LENGTH} знаци
        </p>

        <button
          className="nickname__cta"
          type="button"
          onClick={() => {
            if (nickname.trim()) localStorage.setItem('nickname', nickname.trim())
            navigate('/map')
          }}
        >
          Продолжи кон мапата →
        </button>
      </section>
    </div>
  )
}

export default Nickname
