import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import HeaderUser from '../components/HeaderUser'
import { REACT_APP_API_URI } from "../config";

const JobsDisplayByCompany = () => {
  const [jobs, setJobs] = useState([]);
  const { company_id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    axios.get(`${REACT_APP_API_URI}/api/companies/${company_id}`, { withCredentials: true })
      .then(res => setCompany(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`${REACT_APP_API_URI}/api/companies/${company_id}/jobs`, { withCredentials: true })
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <HeaderUser>
        <button className='btn btn-secondary me-2'>
          <Link to='/jobs/new' style={{ color: 'inherit', textDecoration: 'inherit' }}>New Job</Link>
        </button>
      </HeaderUser>
      <h2 className="text-center">Jobs at {company.name}</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Stage</th>
            <th>Job Title</th>
          </tr>
          {jobs.map(job => <tr key={job._id}>
            <td>{job.stage}</td>
            <td>
              <Link to={`/jobs/${job._id}`}>{job.title}</Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default JobsDisplayByCompany