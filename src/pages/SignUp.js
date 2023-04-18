import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComp from '../components/ModalComp.js'

function SignUp(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  function pushData(e) {
    e.preventDefault();

    let fd = new FormData();
    fd.append("auth_source", "sign_up");
    fd.append("first_name", formData.firstName);
    fd.append("last_name", formData.lastName);
    fd.append("username", formData.username);
    fd.append("password", formData.password);

    e.target.reset();

    fetch("/auth", {
      method: "POST",
      body: fd,
    })
    .then((response) => response.json())
    .then((data) => {
      if(data['message'] === 'success') {
        navigate('/view-my-projects');
      } else {
        const errMsg = data['message']
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
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e) => pushData(e)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link className="link-primary" to="/sign-in">
                Sign In
              </Link>
            </div>
            <div className="row form-group mt-3">
              <div className="col">
                <label>First Name</label>
                <input
                  onChange={(e) => handle(e)}
                  id="firstName"
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane"
                  required
                />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input
                  onChange={(e) => handle(e)}
                  id="lastName"
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Doe"
                  required
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                onChange={(e) => handle(e)}
                id="username"
                type="text"
                className="form-control mt-1"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                onChange={(e) => handle(e)}
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp