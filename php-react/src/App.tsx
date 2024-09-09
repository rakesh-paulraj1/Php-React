
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './userpages/Dashboard'
import Studentdashboard from './userpages/Studentdashboard'
import Adduser from './userpages/Adduser'
import { UnifiedSigninPage } from './userpages/Signin'
import Upadtestudent from './userpages/Upadtestudent'

const App: React.FC = () => {
  

  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<UnifiedSigninPage/>}></Route>
  <Route path="/admindashboard" element={<Dashboard/>}></Route>
  <Route path="/studentdashboard" element={<Studentdashboard/>}></Route>
  <Route path="/addstudent" element={<Adduser/>}></Route>
  <Route path="/updatestudent" element={<Upadtestudent/>}></Route>
</Routes>
      </BrowserRouter>
  )
}

export default App
