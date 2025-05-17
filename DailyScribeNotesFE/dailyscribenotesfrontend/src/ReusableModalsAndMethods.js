import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const SignupPage = ({show,onClose,title}) => {
    return (
      <div>
        <Modal show={show} onHide={onClose} className="signup-modal-body ">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="login-modal signup-modal">
          <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the username"
                        style={{ width: '15vw' }}
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        style={{ width: '15vw' }}
                        placeholder="Enter the email"
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        style={{ width: '15vw' }}
                        placeholder="Enter the password"
                    />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        style={{ width: '15vw' }}
                        placeholder="Enter the confirm password"
                    />
                    <div className="btn-grps">
                        <Button>Login</Button>
                        <Button>Reset</Button>
                    </div>
                    </Form>
                    </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
export default SignupPage;
  

