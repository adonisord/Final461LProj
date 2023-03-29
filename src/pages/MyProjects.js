import React, { useState, useEffect } from "react";
import Project from "../components/Project.js";
import Navbar from "../components/Navbar.js";

function MyProjects() {
  const [projectArr, setProjectArr] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    fetch("/view-my-projects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContentLoaded(true);
        setProjectArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (contentLoaded) {
    if (projectArr.length > 0) {
      return (
        <>
          <Navbar />
          <div className="projects mt-3">
            <div className="text-center">
              <h1>My Projects</h1>
            </div>
            {projectArr &&
              projectArr.map((project) => {
                return (
                  <Project
                    name={project.name}
                    id={project._id}
                    authUsers={project.authorized_users}
                    hardware={project.hardware}
                    JoinedStatus={true}
                    key={project._id}
                  />
                );
              })}
          </div>
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <div className="center-container">
            <h1>You have no projects.</h1>
          </div>
        </>
      );
    }
  }
}

export default MyProjects;
