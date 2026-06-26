import { useNavigate } from 'react-router-dom'
import a1Logo from '../../assets/images/A1_Logo_Std_Red_Pos_3_L.png'
import keyVisual from '../../assets/images/keyvisual.svg'
import './Welcome.css'

const steps = [
  {
    number: 1,
    title: 'Најди',
    description: 'Пронајди тимпанон во градот',
  },
  {
    number: 2,
    title: 'Фотографирај',
    description: 'Фотографирај ја ознаката',
  },
  {
    number: 3,
    title: 'Отклучи',
    description: 'Откриј историска приказна',
  },
]

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome">
      <section className="welcome__hero">
        <img className="welcome__logo" src={a1Logo} alt="A1" />
        <h1 className="welcome__title">Крушево</h1>
        <h2 className="welcome__subtitle">Град на приказни</h2>
        <img className="welcome__tympanon" src={keyVisual} alt="" />
      </section>

      <section className="welcome__card">
        <h2 className="welcome__steps-title">КАКО ФУНКЦИОНИРА</h2>
        <ol className="welcome__steps">
          {steps.map((step, index) => (
            <li className="welcome__step" key={step.number}>
              <span className="welcome__step-badge">{step.number}</span>
              <h3 className="welcome__step-title">{step.title}</h3>
              <p className="welcome__step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <span className="welcome__step-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <button className="welcome__cta" type="button" onClick={() => navigate('/nickname')}>
          Започни ја потрагата
        </button>
      </section>
    </div>
  )
}

export default Welcome
