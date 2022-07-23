import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";

import { REACT_APP_API_URI } from "../config";

const JobForm = (props) => {
  const { job, setJob, submitText, onSubmitProp } = props
  const errors = props.validationErrors

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }

  /*
  Companies
  */
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyErrorMessage, setNewCompanyErrorMessage] = useState('');

  useEffect(() => { reloadCompanies() }, []);

  const showModal = () => {
    setNewCompanyErrorMessage('');
    setIsModalOpen(true);
  }

  const hideModal = () => {
    setIsModalOpen(false);
  }

  const reloadCompanies = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URI}/api/companies`, { withCredentials: true });
      const companies = res.data;
      companies.sort((a, b) => a.name.localeCompare(b.name)); // sort company list alphabetically
      setCompanies(companies);
    } catch (err) {
      console.log(err);
    }
  }

  const addCompany = async () => {
    try {
      const res = await axios.post(`${REACT_APP_API_URI}/api/companies`, { name: newCompanyName }, { withCredentials: true });
      const companyId = res.data._id;
      setNewCompanyErrorMessage(''); // clear new company errors
      setJob({ ...job, company_id: companyId, company_name: newCompanyName }); // set new company as selected one
      await reloadCompanies(); // reload company list so the new one is shown in the drop down
      hideModal();
    } catch (err) {
      // Check if we failed because of a duplicate entry (error code 11000)
      if (err.response && err.response.data) {
        const mongoError = err.response.data.err;
        if (mongoError.code === 11000) {
          setNewCompanyErrorMessage('Company already exists');
        }
      }


      // setNewCompanyErrors(err.response.data.error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='card p-4'>
        <div className='d-flex'>
          <div className='me-5 flex-fill'>

            <label>Job Title:</label>
            {errors.title && <p className='text-danger'>{errors.title.message}</p>}
            <input type="text" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} className="form-control mb-2" />

            <label>Company:</label>
            {errors.company_id && <p className='text-danger'>{errors.company_id.message}</p>}
            <div className="input-group mb-3">
              <select onChange={(e) => setJob({ ...job, company_id: e.target.value, company_name: e.target.selectedOptions[0].text })} className="form-control" value={job.company_id}>
                <option value="">Select company</option>
                {companies.map(company => (<option key={company._id} value={company._id}>{company.name}</option>))}
              </select>
              <button type="button" className="btn btn-primary" onClick={showModal}>Add</button>
            </div>

            <label>Languages:</label>
            {errors.languages && <p className='text-danger'>{errors.languages.message}</p>}
            <input type="text" value={job.languages} onChange={(e) => setJob({ ...job, languages: e.target.value })} className="form-control mb-2" />

            <label>Contact:</label>
            {errors.contact && <p className='text-danger'>{errors.contact.message}</p>}
            <input type="text" value={job.contact} onChange={(e) => setJob({ ...job, contact: e.target.value })} className="form-control mb-2" />

            <label>Description:</label>
            {errors.description && <p className='text-danger'>{errors.description.message}</p>}
            <textarea cols="20" rows="3" className="form-control mb-2" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })}></textarea>

          </div>
          <div className="flex-fill">

            <label>Application Due:</label>
            {errors.application_due && <p className='text-danger'>{errors.application_due.message}</p>}
            <input type="date" className="form-control mb-2" value={job.application_due} onChange={(e) => setJob({ ...job, application_due: e.target.value })}></input>

            <label>Applied:</label>
            {errors.date_applied && <p className='text-danger'>{errors.date_applied.message}</p>}
            <input type="date" className="form-control mb-2" value={job.date_applied} onChange={(e) => setJob({ ...job, date_applied: e.target.value })}></input>

            <label>Misc:</label>
            {errors.misc && <p className='text-danger'>{errors.misc.message}</p>}
            <textarea cols="20" rows="3" className="form-control mb-2" value={job.misc} onChange={(e) => setJob({ ...job, misc: e.target.value })}></textarea>

            <label>Stage:</label>
            {errors.stage && <p className='text-danger'>{errors.stage.message}</p>}
            <input type="number" value={job.stage} onChange={(e) => setJob({ ...job, stage: e.target.value })} min='1' max='10' className="form-control mb-2" />

            <div className="mt-2">
              <input type="submit" value={submitText} className="btn btn-primary" />
            </div>
          </div>
        </div>
      </form>

      <Modal show={isModalOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Add new company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="text" className="form-control" onChange={(e) => setNewCompanyName(e.target.value)} />
            {newCompanyErrorMessage && <div className='text-danger'>{newCompanyErrorMessage}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline" onClick={hideModal}>Cancel</button>
          <button className="btn btn-primary" onClick={addCompany}>Save</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default JobForm