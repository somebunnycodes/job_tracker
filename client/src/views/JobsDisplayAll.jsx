import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'

const JobsDisplayAll = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/jobs', {withCredentials: true})
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  },[])

  return (
    <>
      <HeaderUser>
        <button className='btn btn-secondary me-2'>
          <Link to='/jobs/new' style={{ color: 'inherit', textDecoration: 'inherit'}}>New Job</Link>
        </button>
      </HeaderUser>
      <h2>My Jobs</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Stage</th>
            <th>Job Title</th>
            <th>Company</th>
          </tr>
          {jobs.map(job => <tr key={job._id}>
            <td>{job.stage}</td>
            <td>
              <Link to={`/jobs/${job._id}`}>{job.title}</Link>
            </td>
            <td>
              <Link to={`/jobs/${job._id}`}>{job.company}</Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default JobsDisplayAll