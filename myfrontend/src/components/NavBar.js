import React, { useContext , useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form' 
import FormControl from 'react-bootstrap/FormControl'
import { BrowserRouter as Router, Switch, Route, Link,withRouter, useHistory } from "react-router-dom";
import Jobpost from './Jobpost'
import ShowJobs from './showjobs'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import TopUsers from './topusers'
import EditJob from './EditJob'
import Profile from './Profile'
import FavJobs from './FavJobs'
import axios from 'axios'
import {UserContext} from './UserContext'
//export const UserContext = React.createContext()
function NavBar(props) {
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("Login");
  const [email2, setEmail2] = useState("Login");
  const [userid, setUserid] = useState("eww");
  const [islogged, setIslogged] = useState("islogged");
  let history = useHistory();
  const [redirectToReferrer, setRedirectToReferrer] = useState("false")
  const [test, setTest]= useState(null)
  const value12 = {
    user2: user2,
    email2: email2,
    islogged: islogged,
    userid: userid,
    test: test
  }
  const openProfile=(id)=>{
    console.log('/profile/'+id)
    history.push('/profile/'+id);

}
  useEffect(() => {
    
  },[test]);
  const logout=()=>{
    axios.post('http://localhost:5000/logout', {
      
    })
    .then(function (response) {
        
    })
    .catch(function (error) {
      console.log('Error is ',error);
    });
  }
  
    
    return (<Router>
        <div>
                <>
                <Navbar bg="warning" variant="dark">
                  <Navbar.Brand style={{color: 'black'}} to="/" href="/">JobPost</Navbar.Brand>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button style={{color: 'black'}} variant="outline-light">Search</Button>
                  </Form>

                  {islogged==="true" 
                  ? <Nav style={{}} className="mr-auto">
                    <Nav.Link style={{color: 'black'}} to="/favjobs" href="/favjobs">Favorite Jobs</Nav.Link>
                    </Nav>
                  : <Nav style={{position: 'absolute', right: 70}} className="mr-auto">
                    <Nav.Link style={{color: 'black'}} to="/sign-up" href="/sign-up">Signup</Nav.Link>
                    </Nav>
                  }
                  
                  <Nav style={{position: 'absolute', right: 15}} className="mr-auto">
                    {islogged==="true"
                    ? <Nav.Link onClick={logout} style={{color: 'black', paddingright:'10px'}} >Logout</Nav.Link>
                    : <Nav.Link style={{color: 'black'}} to="/sign-in" href="/sign-in">{user3}</Nav.Link>}
                    <Nav.Link style={{color: 'black'}} onClick={() => { openProfile(userid)}}>{user2}</Nav.Link>
                    
                    
                  </Nav>
                </Navbar>
                <br></br>
                <div className="auth-wrapper">
                  <div className="auth-inner">
                  
                    <Switch>
                    <UserContext.Provider value={ value12 }>
                      <Route exact path="/" >
                      <TopUsers />
                      {islogged==="true"
                      ?<Jobpost setTest={setTest} email2= {email2} />
                      :<Button href="/sign-in" style={{marginLeft: '500px'}} >Click Here To Login So You Can Add Jobs</Button>
                      }
                      
                      <ShowJobs  />
                      </Route>
                      <Route path="/favjobs" component={FavJobs}/>
                        
                      
                      <Route path="/sign-in" >
                        <LoginForm setEmail2={setEmail2} setUserid={setUserid} setIslogged={setIslogged} setUser2={setUser2} user2={user2}/>
                        </Route>
                        <Route path="/sign-up" component={SignupForm} />
                        <Route path="/edit/:id" component={EditJob} />
                        <Route path="/profile/:id" exact component={Profile} />
                      </UserContext.Provider>
                    </Switch>
                    
                        
                    
                  </div>
                </div>
              </>
            
        </div></Router>
    )
}

export default NavBar
