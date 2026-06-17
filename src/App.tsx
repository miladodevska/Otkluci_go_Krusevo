import { Routes, Route } from 'react-router-dom'
import Welcome from './screens/Welcome/Welcome'
import Nickname from './screens/Nickname/Nickname'
import Map from './screens/Map/Map'
import Collection from './screens/Collection/Collection'
import Profile from './screens/Profile/Profile'
import PointDetail from './screens/PointDetail/PointDetail'
import Capture from './screens/Capture/Capture'
import Success from './screens/Success/Success'
import Story from './screens/Story/Story'
import Completed from './screens/Completed/Completed'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/nickname" element={<Nickname />} />
      <Route path="/map" element={<Map />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/point/:id" element={<PointDetail />} />
      <Route path="/point/:id/capture" element={<Capture />} />
      <Route path="/point/:id/success" element={<Success />} />
      <Route path="/point/:id/story" element={<Story />} />
      <Route path="/quest-complete" element={<Completed />} />
    </Routes>
  )
}

export default App
