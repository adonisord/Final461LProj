import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ModalComp from '../components/ModalComp.js'

function JoinProject() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({
        projectID: "",
    });

    function pushData(e) {
    e.preventDefault();

    let fd = new FormData();
    fd.append("join_source", "page")
    fd.append("project_id", formData.projectID);

    e.target.reset();

    fetch("/join-project", {
        method: "POST",
        body: fd,
    })
    .then((response) => response.json())
    .then((data) => {
        if(data['message'] === 'success') {
          navigate('/view-my-projects');
        } else {
          const errMsg = data['Message']
          setShowModal(true)
          setErrorMsg(errMsg)
        }
        console.log(data)
      }
    )
    .catch((err) => console.log(err));
    }

    function handle(e) {
        const newData = { ...formData };
        newData[e.target.id] = e.target.value;
        setFormData(newData);
    }

    function toggleModal() {
        setShowModal(!showModal)
      }

    return (
        <>
            <ModalComp title='Error' errorMessage={errorMsg} show={showModal} handler={toggleModal}/>
            <Navbar/>
            <div className='join-project-container'>
                <form className='join-project-form' onSubmit={(e) => pushData(e)}>
                    <h3 className="Auth-form-title">Join Project</h3>
                    <div className='form-group grid'>
                        <div className='row'>
                            <label>Project ID</label>
                            <input
                            onChange={(e) => handle(e)}
                            id="projectID"
                            type="text"
                            className="form-control mt-1"
                            required
                            />
                        </div>
                        <div className='text-center mt-4'>
                            <button type="submit" className="btn btn-primary">
                            Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default JoinProject