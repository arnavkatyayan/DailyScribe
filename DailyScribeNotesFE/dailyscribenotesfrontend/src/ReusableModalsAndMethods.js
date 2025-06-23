import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";

export const quotes = [
  "Your journal is your safe place to dream, reflect, and grow.",
  "Small steps every day lead to big changes over time.",
  "Write it out — your mind will thank you.",
  "In the pages of your journal, you meet your true self.",
  "Growth begins with honest reflection.",
  "Your story matters, even when it's messy.",
  "Journaling is like whispering to one’s self and listening at the same time.",
  "Progress, not perfection.",
  "Write without fear. Edit without mercy.",
  "You don’t need permission to write your truth.",
  "The act of writing is the act of discovering what you believe.",
  "What you write today might heal you tomorrow.",
  "A journal is a mirror to your soul.",
  "Pour your heart out — the page can hold it.",
  "Silence your inner critic. Let your pen speak.",
  "Today’s thoughts are tomorrow’s breakthroughs.",
  "Journaling is your time machine for self-awareness.",
  "The words you write shape the person you become.",
  "Every entry is a step toward clarity.",
  "Let go through ink. Heal through words.",
  "Reflect. Reset. Reignite.",
  "Write to understand, not to impress.",
  "Your future self will thank you for today's honesty.",
  "The most powerful story you can tell is your own.",
  "Every page turned is a step toward peace."
];

export const getDate = (date) => {
  return date.split("T")[0];
}

export const SignupPage = ({
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

export const ForgetPasswordPage = ({show,onClose,title,userName,handleUsername,handleForgetPassword})=> {
return(
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
                value={userName}
                onChange={handleUsername}
              />

              <div className="btn-grps mt-3">
                <Button variant="primary" onClick={handleForgetPassword}>Send</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
)
}

export const ViewAndEdit = ({ show, onClose, title, journal, isEdit, handleJournal, handleEditAPI, handleReset, journalTitle, handleJournalTitle }) => {
  return (
    <div>
      <Modal show={show} onHide={onClose} className="signup-modal-body">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {isEdit === false ?
          <Modal.Body>
            <div className="login-modal signup-modal view-css">
               <Typewriter
                    options={{
                        strings: [
                            journal
                        ],
                        autoStart: true,
                        loop: true,
                        pauseFor:20000,
                        delay: 30
                    }}
                />
            </div>
          </Modal.Body> :

          <Modal.Body>
            <div className="login-modal signup-modal edit-css">
              <Form className="form-css form-css-edit">
                <Form.Label className="label-css">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the journal"
                  style={{ width: '15vw' }}
                  value={journalTitle}
                  onChange={handleJournalTitle}

                />
                <Form.Label className="label-css">Journal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the journal"
                  style={{ width: '15vw' }}
                  value={journal}
                  onChange={handleJournal}

                />

                <div className="btn-grps mt-3">
                  <Button variant="primary" onClick={handleEditAPI}>Edit</Button>
                  <Button variant="primary" onClick={handleReset}>Reset</Button>
                </div>
              </Form>
            </div>
          </Modal.Body>


        }
      </Modal>
    </div>
  )
}

export const ChangePassword = ({ show, onClose, title, password, confirmPassword, handlePassword, handleConfirmPassword, changePasswordAPI, resetPasswords }) => {
  return (<Modal show={show} onHide={onClose} className="signup-modal-body">
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="login-modal signup-modal edit-css">
        <Form className="form-css form-css-edit">
          <Form.Label className="label-css">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the password"
            style={{ width: '15vw' }}
            value={password}
            onChange={handlePassword}

          />
          <Form.Label className="label-css">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the new password"
            style={{ width: '15vw' }}
            value={confirmPassword}
            onChange={handleConfirmPassword}

          />

          <div className="btn-grps mt-3">
            <Button variant="primary" onClick={changePasswordAPI}>Change</Button>
            <Button variant="primary" onClick={resetPasswords}>Reset</Button>
          </div>
        </Form>
      </div>
    </Modal.Body>
  </Modal>)
}
export const RestoreAccountWindow = ({show,onClose,title,userName,password,handleUserName,handlePassword, handleResetRestore,restoreAccountAPI})=> {
return(
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
                value={userName}
                onChange={handleUserName}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                style={{ width: '15vw' }}
                value={password}
                onChange={handlePassword}
              />

              <div className="btn-grps mt-3">
                <Button variant="primary" onClick={restoreAccountAPI}>Restore</Button>
                <Button variant="primary" onClick={handleResetRestore}>Reset</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
)
}


  

