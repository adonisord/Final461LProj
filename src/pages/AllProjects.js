import React, { useState, useEffect } from "react";
import Project from "../components/Project.js";
import Navbar from "../components/Navbar.js";

function AllProjects() {
  const [projectArr, setProjectArr] = useState([]);
  const [username, setUsername] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    fetch("/view-all-projects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContentLoaded(true);
        const projects = [];
        for (let i = 0; i < data.length - 1; i++) {
          projects.push(data[i]);
        }
        setProjectArr(projects);
        const JSONUsername = data[data.length - 1];
        setUsername(JSONUsername["username"]);
      })
      .catch((err) => console.log(err));
  }, []);

  function getJoinedStatus(authUsers, username) {
    if (authUsers.includes(username)) {
      return true;
    } else {
      return false;
    }
  }

  if (contentLoaded) {
    if (projectArr.length > 0) {
      return (
        <>
          <Navbar />
          <div className="projects mt-3">
            {projectArr && (
              <div className="text-center">
                <h1>All Projects</h1>
              </div>
            )}
            {projectArr &&
              projectArr.map((project) => {
                return (
                  <Project
                    name={project.name}
                    id={project._id}
                    authUsers={project.authorized_users}
                    hardware={project.hardware}
                    JoinedStatus={getJoinedStatus(
                      project.authorized_users,
                      username
                    )}
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
            <h1>There are no projects.</h1>
          </div>
        </>
      );
    }
  }
}

export default AllProjects;
