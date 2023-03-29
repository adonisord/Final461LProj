import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComp(props) {

  return (
    <>
      <Modal
        show={props.show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClick={props.handler}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComp;
