import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import { pk } from "./pk.js";

function EditJob() {
    let params = useParams();
    const [jobtype, setJobtype] = useState("")
    const [jobdescription, setJobdescription] = useState("")
    const [city, setCity] = useState("")
    const [email, setEmail] = useState("")
    let history = useHistory();
    const handleChange=(e) =>{
        setJobtype(e.target.value)
    }
    const handleChange2=(e) =>{
        setCity(e.target.value)
    }
    const getJob=(id)=>{
        axios.get('http://localhost:5000/'+id)
            .then(response => {
                console.log(response.data)
                setJobtype(response.data.jobtype)
                setJobdescription(response.data.jobdescription)
                setCity(response.data.city)
                setEmail(response.data.useremail)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const updatejob=()=>{
        
        const URL = "http://localhost:5000/updatejob";
        var data2 ={
          _id:params.id,  
          jobtype: jobtype,
          jobdescription: jobdescription,
          useremail: email,
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
        
        history.push('/');
    })
    .catch(error => {
        console.log(error.response)
    });

    }
    useEffect(() => {
        console.log("We editing job"+ params.id)
        getJob(params.id)
    }, [])
    return (
        <div class="jumbotron">
            <h1>Edit Job</h1>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Choose Job Type:</label>
            
            <select name="Jobs" value={jobtype} onChange={handleChange}>
                <option value="Software Engineer" >Software Engineer</option>
                <option value="Data Expert">Data Expert</option>
                <option value="Electrical Engineer">Electrical Engineer</option>
                <option value="Mechanical Engineer">Mechanical Engineer</option>
            </select>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>City:</label>
            <select name="city" value={city} onChange={handleChange2}>{pk.map(item=> <option value={item.city}>{item.city}</option>)}</select>
            <div class="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold'}}>Job Description</label>
                <textarea value={jobdescription} onChange={(e)=>{setJobdescription(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3">{jobdescription}</textarea>
            </div>
            <button onClick={() => updatejob()} type="button" class="btn btn-success">Done</button>
            
            
        </div>
    )
}

export default withRouter(EditJob)
