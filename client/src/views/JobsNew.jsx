import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JobForm from '../components/JobForm'
import HeaderUser from '../components/HeaderUser'

const JobsNew = () => {
  const [job, setJob] = useState({user_id: localStorage.getItem('firstName'), title: '', company: '', languages: '', contact: '', description: '', application_due: '', date_applied: '', misc: '', stage: 1})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const createJob = () => {
    axios.post('http://localhost:8000/api/jobs', {...job, user_id: localStorage.getItem('userId')}, {withCredentials: true})
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
      <HeaderUser>
      
      </HeaderUser>
      <JobForm job={job} setJob={setJob} submitText='Submit' onSubmitProp={createJob} validationErrors={validationErrors} />
    </>
  )
}

export default JobsNew