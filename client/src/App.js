import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


import LogReg from "./views/LogReg"
import UserList from './views/UserList'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ButtonLogout from './components/ButtonLogout'
import JobsAll from './views/JobsAll'
import JobsNew from './views/JobsNew'


function App() {
  const navigate = useNavigate()
  
  
  return (
    <div className='container mt-2'>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="users" element={<UserList />} />

        {/* jobs routes */}
        <Route path="jobs" element={<JobsAll />} />
        <Route path="jobs/new" element={<JobsNew />} />

      </Routes>
    </div>
  );
}

export default App;