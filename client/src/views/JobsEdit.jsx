import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import JobForm from '../components/JobForm'
import HeaderUser from '../components/HeaderUser'

const JobsNew = () => {
  const [job, setJob] = useState({user_id: localStorage.getItem('firstName'), title: '', company: '', languages: '', contact: '', description: '', application_due: '', date_applied: '', misc: '', stage: 1})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()
  const { job_id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${job_id}`, {withCredentials: true})
      .then(res => {
        const tmpJob = res.data
        tmpJob.application_due = tmpJob.application_due.slice(0,10)
        tmpJob.date_applied = tmpJob.date_applied.slice(0,10)
        setJob(tmpJob)
  })
      .catch(err => console.log(err))
  },[])

  const updateJob = () => {
    axios.put(`http://localhost:8000/api/jobs/${job_id}`, {...job, user_id: localStorage.getItem('userId')}, {withCredentials: true})
      .then(res => {
        setValidationErrors({})
        navigate('/jobs')
      })
      .catch(err => {
        console.log(err)
        setValidationErrors(err.response.data.err.errors)
      })
  }
  
  return (
    <>
      <HeaderUser />
      <JobForm job={job} setJob={setJob} submitText='Edit' onSubmitProp={updateJob} validationErrors={validationErrors} />
    </>
  )
}

export default JobsNew