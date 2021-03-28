import React, {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams,withRouter, useHistory} from "react-router-dom";
import {UserContext} from './UserContext'
function FavJobs() {
    const [jobs, setJobs]=useState([])
    const value12 = useContext(UserContext);
    
    
    const getData=()=>{
        axios.get('http://localhost:5000/getjobs')
            .then(response => {
                setJobs(response.data);
                
                console.log("API got all reviews bro", response.data)
                console.log("Items are",jobs)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
        
    }
    const getUdata=(email)=>{
        console.log("email in function",email)
        axios.post('/getufavs', {
            useremail:email
          })
          .then(function (response) {
              
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });

    }
    useEffect(() => {
        getData()
        getUdata(value12.email2)
        
    }, [value12.email2])
    return (
        <div>
            
        </div>
    )
}

export default withRouter(FavJobs)
