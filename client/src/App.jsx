import {Route, Routes} from 'react-router-dom'

import Homepage from '../components/Homepage'
import AuthenticateUser from "../components/AuthenticateUser";
// import Dashboard from '../components/Dashboard'

export default function App() {
  return(
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<AuthenticateUser/>} />
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
      </Routes>
  )
}