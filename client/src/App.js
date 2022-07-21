import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import LogReg from "./views/LogReg"
import UserList from './views/UserList'
import LoginForm from './views/LoginForm'
import ButtonLogout from './components/ButtonLogout'


function App() {
  const navigate = useNavigate()
  
  return (
    <div className='container mt-2'>
      <div className="d-flex justify-content-between">
        <h2>MERN Users</h2>
        <ButtonLogout />
      </div>
      <Routes>
        <Route path="/" element={<LogReg />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <div className='mt-2'>
        <Link to='/users'>Get Users List</Link>
      </div>
    </div>
  );
}

export default App;