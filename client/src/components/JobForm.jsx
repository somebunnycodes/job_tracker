import React from 'react'

const JobForm = (props) => {
  const { job, setJob, submitText, onSubmitProp } = props
  const errors = props.validationErrors

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='card p-4'>
      <div className='d-flex'>
        <div className='me-5 flex-fill'>
          
          <label>Job Title:</label>
          { errors.title && <p className='text-danger'>{errors.title.message}</p> }
          <input type="text" value={job.title} onChange={(e) => setJob({...job, title: e.target.value})} className="form-control mb-2"/>
          
          <label>Company:</label>
          { errors.company && <p className='text-danger'>{errors.company.message}</p> }
          <input type="text" value={job.company} onChange={(e) => setJob({...job, company: e.target.value})} className="form-control mb-2"/>
          
          <label>Languages:</label>
          { errors.languages && <p className='text-danger'>{errors.languages.message}</p> }
          <input type="text" value={job.languages} onChange={(e) => setJob({...job, languages: e.target.value})} className="form-control mb-2"/>
          
          <label>Contact:</label>
          { errors.contact && <p className='text-danger'>{errors.contact.message}</p> }
          <input type="text" value={job.contact} onChange={(e) => setJob({...job, contact: e.target.value})} className="form-control mb-2"/>
          
          <label>Description:</label>
          { errors.description && <p className='text-danger'>{errors.description.message}</p> }
          <textarea cols="20" rows="3" className="form-control mb-2" value={job.description} onChange={(e) => setJob({...job, description: e.target.value})}></textarea>

        </div>
        <div className="flex-fill">

          <label>Application Due:</label>
          { errors.application_due && <p className='text-danger'>{errors.application_due.message}</p> }
          <input type="date" className="form-control mb-2" value={job.application_due} onChange={(e) => setJob({...job, application_due: e.target.value})}></input>

          <label>Applied:</label>
          { errors.date_applied && <p className='text-danger'>{errors.date_applied.message}</p> }
          <input type="date" className="form-control mb-2" value={job.date_applied} onChange={(e) => setJob({...job, date_applied: e.target.value})}></input>
          
          <label>Misc:</label>
          { errors.misc && <p className='text-danger'>{errors.misc.message}</p> }
          <textarea cols="20" rows="3" className="form-control mb-2" value={job.misc} onChange={(e) => setJob({...job, misc: e.target.value})}></textarea>

          <label>Stage:</label>
          { errors.stage && <p className='text-danger'>{errors.stage.message}</p> }
          <input type="number" value={job.stage} onChange={(e) => setJob({...job, stage: e.target.value})} min='1' max='10' className="form-control mb-2"/>

      <div className="mt-2">
        <input type="submit" value={submitText} className="btn btn-primary" />
      </div>
        </div>
      </div>
    </form>
  )
}

export default JobForm