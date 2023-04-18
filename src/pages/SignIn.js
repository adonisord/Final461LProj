import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComp from '../components/ModalComp.js'

function SignIn(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function pushData(e) {
    e.preventDefault();

    let fd = new FormData();
    fd.append("auth_source", "sign_in");
    fd.append("username", formData.username);
    fd.append("password", formData.password);

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
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link className="link-primary" to="/sign-up">
                Sign Up
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                onChange={(e) => handle(e)}
                id="username"
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
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
                placeholder="Enter password"
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

export default SignIn