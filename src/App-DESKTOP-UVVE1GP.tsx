import { useState } from 'react'
import MapView from './components/MapView'
import a1Logo from './assets/a1-logo.png'
import tympanonHero from './assets/tympanon-hero.svg'
import './App.css'

function App() {
  const [screen, setScreen] = useState<'welcome' | 'map'>('welcome')

  return (
    <div className="app">
      {screen === 'welcome' ? (
        <div className="hero">
          <img src={tympanonHero} className="tympanon-overlay" alt="" />
          <img src={a1Logo} className="a1-logo" alt="A1" />
          <h1>Отклучи го Крушево</h1>
          <p>
            Тргни во потрага низ фасадите на Крушево — откривај приказни,
            собирај точки и отклучи го градот.
          </p>
          <button className="cta" onClick={() => setScreen('map')}>
            Започни потрага
          </button>
        </div>
      ) : (
        <div className="map-view">
          <header>
            <h2>Карта</h2>
            <button onClick={() => setScreen('welcome')}>Назад</button>
          </header>
          <MapView />
        </div>
      )}
    </div>
  )
}

export default App
