import { Routes, Route } from 'react-router-dom';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import JobsDisplayAll from './views/JobsDisplayAll';
import JobsNew from './views/JobsNew';
import JobsDisplayOne from './views/JobsDisplayOne';
import JobsEdit from './views/JobsEdit';


function App() {

  return (
    <div className='container mt-2'>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />

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