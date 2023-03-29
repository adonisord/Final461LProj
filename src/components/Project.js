import React from "react";
import AuthUserList from "./AuthUserList.js";
import CheckInOut from "./CheckInOut.js";

function Project(props) {
  return (
    <div className="project ps-5 d-flex justify-space-around flex-nowrap">
      <div className="project-name-container">
        <h3 className="name-text">{props.name}</h3>
        <p className="name-text">ID: {props.id}</p>
      </div>
      <div className="auth-user-list-container">
        <AuthUserList authUsers={props.authUsers} />
      </div>
      <div className="checkInOut-container">
        <CheckInOut
          id={props.id}
          hardware={props.hardware}
          name={props.name}
          JoinedStatus={props.JoinedStatus}
        />
      </div>
    </div>
  );
}

export default Project;
