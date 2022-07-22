import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HeaderUser from '../components/HeaderUser'
import { useParams, Link, useNavigate } from 'react-router-dom'

const JobsDisplayOne = () => {
  const [job, setJob] = useState({})
  const { job_id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${job_id}`, {withCredentials: true})
      .then(res => setJob(res.data))
      .catch(err => console.log(err))
  },[])

  const tableFieldStyle = {fontWeight: '700'}

  const deleteJob = () => {
    axios.delete(`http://localhost:8000/api/jobs/${job_id}`, {withCredentials: true})
      .then(res => {
        navigate('/jobs')
      })
      .catch(err => console.log(err))
  }
  
  return (
    <>
      <HeaderUser />
      <h2>Job Details</h2>
      <div className="card my-3 p-3">
        <div className="d-flex">
          <div className="flex-fill">
            <table>
              <tbody>
                <tr>
                  <td style={tableFieldStyle}>Job Title:</td>
                  <td>{job.title}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Company:</td>
                  <td>{job.company}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Languages:</td>
                  <td>{job.languages}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Contact:</td>
                  <td>{job.contact}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Description:</td>
                  <td>{job.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-fill">
          <table>
              <tbody>
                <tr>
                  <td style={tableFieldStyle}>Application Due:</td>
                  <td>{job.application_due && job.application_due.slice(0,10)}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Date Applied:</td>
                  <td>{job.date_applied && job.date_applied.slice(0,10)}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>Misc:</td>
                  <td>{job.misc}</td>
                </tr>
                <tr>
                  <td style={tableFieldStyle}>tage:</td>
                  <td>{job.stage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button className='btn btn-warning me-2'>
        <Link to={`/jobs/${job_id}/edit`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit</Link>
      </button>
      <button className='btn btn-danger me-2' onClick={() => deleteJob()}>Delete</button>
    </>
  )
}

export default JobsDisplayOne