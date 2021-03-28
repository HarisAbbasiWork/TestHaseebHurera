import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {UserContext} from './UserContext'

function Profile() {
    const value12 = useContext(UserContext);
    const getProfile=(email)=>{
        axios.get('http://localhost:5000/profile/'+email)
            .then(response => {
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    useEffect(() => {
        getProfile(value12.email2)
        
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Profile
