import React, { useState, useEffect, useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 

import {UserContext} from './UserContext'


import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
function ShowJobs() {
    const [jobs, setJobs]=useState([])
    const [jobs2, setJobs2]=useState([])
    
    const [option, setOption]=useState('All')
    
    const jjobs =['All','Software Engineer','Data Expert', 'Electrical Engineer', 'Mechanical Engineer']
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const value12 = useContext(UserContext);
    const getData=()=>{
        axios.get('http://localhost:5000/getjobs')
            .then(response => {
                setJobs(response.data);
                setJobs2(response.data)
                console.log("API got all reviews bro", response.data)
                console.log("Items are",jobs)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
        console.log("our useremail/islogged in showjobs", value12.email2,value12.islogged, value12.test)

    }
    useEffect(()=>{
        getData()
       
    

    },[value12.test])
    const handleChange=(jjob) =>{
        setOption(jjob)
        if(jjob=='All'){
            setJobs2(jobs)
        }else{
            setJobs2(jobs.filter(job=>job.jobtype == jjob))

        }
        
    }
    const handleDelete=(id)=>{
        console.log("fuckkk",id)
        axios.post('/deleteJob', {
            id: id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        console.log("Did it get")
        setJobs2(jobs.filter(job=>job._id !== id))

    }
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
        

    }
    const addFav=(id)=>{
        console.log("Job ID: "+id+" User email:"+value12.email2)
        
        
        axios.post('/addtofav', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
    }
    return (
        <div>
            <a>Heyyy {value12.user2}{value12.email2} {value12.islogged}</a>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#FFC107', color: 'black'}}>    Fresh Jobs</h3>
            {jjobs.map(jjob=>(
                <button
                type="button"
                className="btn toggle-btn"
                
                style={{backgroundColor: jjob===option?'#4CAF50':null , border:'2px solid #6F020A'}}
                onClick={()=>{handleChange(jjob)}}
              >
                <span>{jjob}</span>
              </button>
              
            ))}
            {jobs2.map(job=>(
                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    {job.useremail===value12.email2?<button onClick={()=>{handleEdit(job._id)}} style={{float:'right'}} type="button" class="btn btn-success">Edit</button>:null}
                    {job.useremail===value12.email2?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Job</button>:null}
                    <h1 style={{size:'12px'}}>{job.jobtype} Needed by {job.useremail}</h1>
                    
                    <a>Job Stationed In {job.city}</a>
                    <br></br>
                    <a>Description: {job.jobdescription}</a>
                    {job.useremail!==value12.email2&&value12.islogged==="true"?<button onClick={()=>{addFav(job._id)}} style={{position:'absolute',left:'35%'}} type="button" class="btn btn-success">Add To Favorites</button>:null}
                    {job.useremail!==value12.email2&&value12.islogged==="true"?<button style={{position:'absolute',left:'50%'}} type="button" class="btn btn-success">Apply</button>:null}
                </div>
            </div>
            ))}
            

            
            
        </div>
    )
}

export default ShowJobs
