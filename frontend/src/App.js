import React,{useEffect} from 'react';
import './App.css';
import SignIn from './component/SignIn/SignIn';
import Landing from './component/landing/Landing';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Profile from './component/profile/Profile';
import SearchConfirm from './component/confirm/confirm';


function App() {
  useEffect(()=>{
    return(
    console.log("refresh")
    )
  })
  return (
    <Router>
      
    
      <div className="header">
        <div className='header-inner'>
          <img className="img-fluid" alt="img" src={'./fpblogo.jpg'} />
          <h2>POLY<br/>CONSULT<br/>TICKETING</h2>
        </div>
        {
          sessionStorage.getItem('token') && <Link className='linkticket' to='/mytickets'>VIEW TICKETS</Link>
        }
      </div>
    <Switch>
      <Route path='/' exact render={props =>  <SignIn {...props} />}/>
      <Route path='/landing' render={props=> {

      if(sessionStorage.getItem('token')){
        return(<Landing {...props}/>)
      }else{
          return( <Redirect path='/'/>)
      }
        }} />
      
        <Route path='/mytickets' exact render={props => <Profile />} />
        <Route path='/confirm' exact render={props => <SearchConfirm/>}/>
        
    </Switch>
    <div className="footer">
        <div className='header-inner'>
          <img className="img-fluid_" alt="img" src={'./fpblogo.jpg'} />
          <h2>POLY<br/>CONSULT<br/>TICKETING</h2>
        </div>
        {sessionStorage.getItem('token') && <button onClick={() => {
          sessionStorage.removeItem('token')
          window.location.reload()
          }} className='linkticket' >LOG OUT</button>}
      </div>
   </Router>
      
  );
}

export default App;
