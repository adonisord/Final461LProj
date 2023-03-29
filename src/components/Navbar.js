import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* <Link className="navbar-brand" to="#">
          Navbar
        </Link> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/view-all-availability">
                Availability
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/join-project">
                Join
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/create-project">
                Create
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle active"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                View
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/view-my-projects">
                    My Projects
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/view-all-projects">
                    All Projects
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <Link className="nav-link" to="/sign-in">
              Sign Out
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
