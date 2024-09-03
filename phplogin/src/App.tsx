
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SigninCard } from './userpages/Signin'
import { SignupCard } from './userpages/Signup'
import Dashboard from './userpages/Dashboard'

const App: React.FC = () => {
  

  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<SigninCard/>}></Route>
  <Route path="/signup" element={<SignupCard/>}></Route>
  <Route path="/dashboard" element={<Dashboard/>}></Route>
</Routes>
      </BrowserRouter>
  )
}

export default App
