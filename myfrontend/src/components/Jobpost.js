import React, { useState, useEffect }  from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter, useHistory } from 'react-router-dom'; 
import { pk } from "./pk.js";

function Jobpost(props) {
    const [jobtype, setJobtype] = useState("")
    const [jobdescription, setJobdescription] = useState("")
    const [city, setCity] = useState("")
    const [success, setSuccess] = useState(null)
    let history = useHistory();
    const handleChange=(e) =>{
        setJobtype(e.target.value)
    }
    const handleChange2=(e) =>{
        setCity(e.target.value)
    }
    const addJob=()=>{
        console.log("User email in JP: ", props.email2)
        const URL = "http://localhost:5000/addjob";
        var data2 ={
          jobtype: jobtype,
          jobdescription: jobdescription,
          useremail: props.email2,
          city: city,
          date: new Date().toLocaleString()
      }
      console.log(data2);
      const options = {
        method: 'post',
        url: URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        data: data2,
  
        validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          
      }}
    
    axios(options).then(response => { 
        console.log("success response: ",response.data.message)
        setSuccess(response.data.message)
        history.push('/');
    })
    .catch(error => {
        console.log(error.response)
    });
  
      }
    useEffect(()=>{
        console.log("we have email",props.email2)

    },[])
    return (
        <div class="jumbotron">
            <h1>Post Job</h1>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Choose Job Type:</label>
            
            <select name="Jobs" onChange={handleChange}>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Expert">Data Expert</option>
                <option value="Electrical Engineer">Electrical Engineer</option>
                <option value="Mechanical Engineer">Mechanical Engineer</option>
            </select>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>City:</label>
            <select name="city" onChange={handleChange2}>{pk.map(item=> <option value={item.city}>{item.city}</option>)}</select>
            <div class="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold'}}>Job Description</label>
                <textarea onChange={(e)=>{setJobdescription(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button onClick={() => addJob()} type="button" class="btn btn-success">Post Job</button>
            {success? <div class="alert alert-success" role="alert">{success}</div> : null}
            
        </div>
    )
}

export default withRouter(Jobpost)
