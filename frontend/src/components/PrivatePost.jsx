import React, { useEffect } from 'react'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { getUserApi } from '../context/notes/ApiCalls';
import NoteContext from '../context/notes/noteContext';
import UserContext from '../context/user/UserContext';
import  "./PostPage.css";

export default function PrivatePost() {
  let navigate=useNavigate();
  
  let {privatePost,getPrivatePost,requestJoin}=useContext(NoteContext);
  let {user,getUser}=useContext(UserContext);

  let onRequest=(eventID)=>{
    requestJoin(eventID,user._id)
    
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      getPrivatePost();
      if(!user._id){
      getUser();
      }
      
    }else{
      navigate('/login');
    }

    
  },[]);

  let statusOfPost=(event)=>{
    if(event.joiningRequest.includes(user._id)){
      return "Requested"
    }
    if(event.selectedMembers.includes(user._id)){
      return "Selected"
    }
    return "Request"
  }


  return (
    
    <div class="demo">
  <h1>Private Posts</h1>
 
  
  <div className="table-responsive-vertical shadow-z-1">
 
  <table id="table" class="table  table-mc-light-blue">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Required</th>
          <th>Accept</th>
        </tr>
      </thead>
      <tbody>
        {
            privatePost.map((e,k)=>{
                return (
                    <tr key={k}>
                    <td data-title="ID">{e._id}</td>
                    <td data-title="Name">{e.name}</td>
                    <td data-title="Required">
                     {e.requiredTeamMembers}
                    </td>
                    <button onClick={()=>onRequest(e._id)} data-title="Accept">{statusOfPost(e)}</button>
                  </tr>
                )
            })
        }
  
      </tbody>
    </table>

    
  </div>
  


</div>
  
  )
}
