import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const SignupPage = ({
  show,
  onClose,
  title,
  userNameSU,
  emailSU,
  passwordSU,
  confirmPasswordSU,
  handleUserNameSU,
  handleEmailSU,
  handlePasswordSU,
  handleConfirmPasswordSU,
  handleSignup,
  handleReset
}) => {
  return (
    <div>
      <Modal show={show} onHide={onClose} className="signup-modal-body">
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
                value={userNameSU}
                onChange={handleUserNameSU}
              />

              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the email"
                style={{ width: '15vw' }}
                value={emailSU}
                onChange={handleEmailSU}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                style={{ width: '15vw' }}
                value={passwordSU}
                onChange={handlePasswordSU}
              />

              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the confirm password"
                style={{ width: '15vw' }}
                value={confirmPasswordSU}
                onChange={handleConfirmPasswordSU}
              />

              <div className="btn-grps mt-3">
                <Button variant="primary" onClick={handleSignup}>Sign Up</Button>
                <Button variant="secondary" type="reset" onClick={handleReset}>Reset</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignupPage;
  

