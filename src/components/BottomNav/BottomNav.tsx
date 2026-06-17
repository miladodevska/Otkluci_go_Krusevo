import { NavLink } from 'react-router-dom'
import mapIcon from '../../assets/icons/map.png'
import collectionIcon from '../../assets/icons/collection.png'
import profileIcon from '../../assets/icons/profile.png'
import './BottomNav.css'

const tabs = [
  { to: '/map', icon: mapIcon, isImage: true, label: 'Мапа' },
  { to: '/collection', icon: collectionIcon, isImage: true, label: 'Колекција' },
  { to: '/profile', icon: profileIcon, isImage: true, label: 'Профил' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            isActive ? 'bottom-nav__tab bottom-nav__tab--active' : 'bottom-nav__tab'
          }
        >
          {({ isActive }) => (
            <>
              {tab.isImage ? (
                <img className="bottom-nav__icon bottom-nav__icon--image" src={tab.icon} alt="" />
              ) : (
                <span className="bottom-nav__icon" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span className="bottom-nav__label">{tab.label}</span>
              {isActive && <span className="bottom-nav__dot" aria-hidden="true" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
