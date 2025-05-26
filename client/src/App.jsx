import {Route, Routes} from 'react-router-dom'

import Homepage from '../components/Homepage'
import UserLogin from '../components/UserLogin'
// import Dashboard from '../components/Dashboard'

export default function App() {
  return(
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<UserLogin/>} />
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
      </Routes>
  )
}