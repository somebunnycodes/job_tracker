import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import JobForm from '../components/JobForm'
import HeaderUser from '../components/HeaderUser'
import { REACT_APP_API_URI } from "../config";

const JobsNew = () => {
  const [job, setJob] = useState({ user_id: localStorage.getItem('firstName'), title: '', company: '', languages: '', contact: '', description: '', application_due: '', date_applied: '', misc: '', stage: 1 })
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const createJob = () => {
    axios.post(`${REACT_APP_API_URI}/api/jobs`, job, { withCredentials: true })
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
      <JobForm job={job} setJob={setJob} submitText='Submit' onSubmitProp={createJob} validationErrors={validationErrors} />
    </>
  )
}

export default JobsNew