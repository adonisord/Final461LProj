import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function CreateProject() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
    });

    function pushData(e) {
    e.preventDefault();

    let fd = new FormData();
    fd.append("project_name", formData.projectName);
    fd.append("project_description", formData.projectDescription);

    e.target.reset();

    fetch("/create-project", {
        method: "POST",
        body: fd,
    })
    .then((response) => response.json())
    .then((data) => {
        if(data['message'] === 'success') {
          navigate('/view-my-projects');
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

    return (
        <>
            <Navbar/>
            <div className='create-project-container'>
                <form className='create-project-form' onSubmit={(e) => pushData(e)}>
                    <h3 className="Auth-form-title">Create Project</h3>
                    <div className='form-group grid'>
                        <div className='row'>
                            <label>Project Name</label>
                            <input
                            onChange={(e) => handle(e)}
                            id="projectName"
                            type="text"
                            className="form-control mt-1"
                            required
                            />
                        </div>
                        <div className='row'>
                            <label>Project Description</label>
                                <textarea
                                onChange={(e) => handle(e)}
                                id="projectDescription"
                                type="text"
                                className="form-control mt-1"
                                rows={4}
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

export default CreateProject