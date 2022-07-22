import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


import LogReg from "./views/LogReg"
import UserList from './views/UserList'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ButtonLogout from './components/ButtonLogout'
import JobsDisplayAll from './views/JobsDisplayAll'
import JobsNew from './views/JobsNew'
import JobsDisplayOne from './views/JobsDisplayOne'
import JobsEdit from './views/JobsEdit'


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
        <Route path="jobs" element={<JobsDisplayAll />} />
        <Route path="jobs/new" element={<JobsNew />} />
        <Route path="jobs/:job_id" element={<JobsDisplayOne />} />
        <Route path="jobs/:job_id/edit" element={<JobsEdit />} />

      </Routes>
    </div>
  );
}

export default App;