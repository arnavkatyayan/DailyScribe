import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
function App() {
  return (
    <>
    <div className='header-class'>
      <h1>Daily Scribe</h1>
    </div>

    <LoginPage/>
    <div className='footer-class'>
      <div className='version-author'>
     <p className='version-no'>Version 1.0.0 | </p> 
     <p className='version-no'>Arnav Katyayan | </p> 
     <p className='version-no'>All Rights Reserved </p> 
    </div>
    </div>
    </>
  );
}

export default App;
