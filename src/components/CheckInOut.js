import React, { useState, useEffect, useRef } from "react";
import ModalComp from "./ModalComp";

function CheckInOut(props) {
  const [HWSet1Qty, setHWSet1Qty] = useState(0);
  const [HWSet2Qty, setHWSet2Qty] = useState(0);
  const [JoinedStatus, setJoinedStatus] = useState(props.JoinedStatus);
  const [JoinedText, setJoinedText] = useState(JoinedStatus ? "Leave" : "Join");
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const HWSet1Input = useRef();
  const HWSet2Input = useRef();

  console.log(props.hardware);

  useEffect(() => {
    for (let i = 0; i < props.hardware.length; i++) {
      if (props.hardware[i]["set"] === "1") {
        setHWSet1Qty(props.hardware[i]["qty"]);
      } else if (props.hardware[i]["set"] === "2") {
        setHWSet2Qty(props.hardware[i]["qty"]);
      }
    }
  }, [props.hardware]);

  function CheckInHWSet1(e) {
    if (JoinedStatus === true) {
      const input = HWSet1Input.current.value;
      HWSet1Input.current.value = null;

      let fd = new FormData();
      fd.append("project_id", props.id);
      fd.append("set", 1);
      fd.append("qty", input);

      fetch("/check-in-hardware", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const message = data["message"];
          if (message === "success") {
            setHWSet1Qty(data["newQty"]);
          } else {
            const errMsg = data["message"];
            setShowModal(true);
            setErrorMsg(errMsg);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function CheckOutHWSet1(e) {
    if (JoinedStatus === true) {
      const input = HWSet1Input.current.value;
      HWSet1Input.current.value = null;

      let fd = new FormData();
      fd.append("project_id", props.id);
      fd.append("set", 1);
      fd.append("qty", input);

      fetch("/check-out-hardware", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] === "success") {
            setHWSet1Qty(data["newQty"]);
          } else {
            const errMsg = data["message"];
            setShowModal(true);
            setErrorMsg(errMsg);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function CheckInHWSet2(e) {
    if (JoinedStatus === true) {
      const input = HWSet2Input.current.value;
      HWSet2Input.current.value = null;

      let fd = new FormData();
      fd.append("project_id", props.id);
      fd.append("set", 2);
      fd.append("qty", input);

      fetch("/check-in-hardware", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] === "success") {
            setHWSet2Qty(data["newQty"]);
          } else {
            const errMsg = data["message"];
            setShowModal(true);
            setErrorMsg(errMsg);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function CheckOutHWSet2(e) {
    if (JoinedStatus === true) {
      const input = HWSet2Input.current.value;
      HWSet2Input.current.value = null;

      let fd = new FormData();
      fd.append("project_id", props.id);
      fd.append("set", 2);
      fd.append("qty", input);

      fetch("/check-out-hardware", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] === "success") {
            setHWSet2Qty(data["newQty"]);
          } else {
            const errMsg = data["message"];
            setShowModal(true);
            setErrorMsg(errMsg);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function updateJoinedStatus() {
    let fd = new FormData();
    fd.append("join_source", "button");
    fd.append("project_id", props.id);

    if (JoinedText === "Join") {
      fetch("/join-project", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      setJoinedText("Leave");
    } else if (JoinedText === "Leave") {
      fetch("/leave-project", {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      setJoinedText("Join");
    }
    setJoinedStatus(!JoinedStatus);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <ModalComp
        title="Error"
        errorMessage={errorMsg}
        show={showModal}
        handler={toggleModal}
      />
      <div className="row">
        <div className="col-10">
          <div className="row">
            <div className="col col-md-4">
              <h5 className="text-start">HW Set 1: {HWSet1Qty} units</h5>
            </div>
            <div className="col col-md-4 d-flex justify-content-center">
              <input
                ref={HWSet1Input}
                type="text"
                disabled={`${JoinedStatus ? "" : "disabled"}`}
                placeholder="Enter Qty"
              />
            </div>
            <div className="col col-md-2 d-flex justify-content-center">
              <button
                onClick={CheckOutHWSet1}
                type="button"
                className="btn btn-secondary"
              >
                Check Out
              </button>
            </div>
            <div className="col col-md-2 d-flex justify-content-center">
              <button
                onClick={CheckInHWSet1}
                type="button"
                className="btn btn-secondary"
              >
                Check In
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col col-md-4">
              <h5 className="text-start">HW Set 2: {HWSet2Qty} units</h5>
            </div>
            <div className="col col-md-4 d-flex justify-content-center">
              <input
                ref={HWSet2Input}
                type="text"
                disabled={`${JoinedStatus ? "" : "disabled"}`}
                placeholder="Enter Qty"
              />
            </div>
            <div className="col col-md-2 d-flex justify-content-center">
              <button
                onClick={CheckOutHWSet2}
                type="button"
                className="btn btn-secondary"
              >
                Check Out
              </button>
            </div>
            <div className="col col-md-2 d-flex justify-content-center">
              <button
                onClick={CheckInHWSet2}
                type="button"
                className="btn btn-secondary"
              >
                Check In
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col-2">
          <button
            onClick={updateJoinedStatus}
            type="button"
            className={`btn join-btn ${
              JoinedStatus ? "btn-danger" : "btn-success"
            }`}
          >
            {JoinedText}
          </button>
        </div> */}
      </div>
    </>
  );
}

export default CheckInOut;
