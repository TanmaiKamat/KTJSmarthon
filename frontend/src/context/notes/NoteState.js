import NoteContext from "./noteContext";
import { useState,useEffect } from "react";
import {getAllPrivatePostApi, getAllPublicPostApi, joinRequestApi, removeMembersApi, selectMembersApi} from "./ApiCalls";
const NoteState=(props)=>{
    
     
      const [notes, setnotes] = useState([]);
      const [privatePost, setPrivatePosts] = useState([]);
      
      const getPublicPost=async ()=>{
        const allNotes=await getAllPublicPostApi();
        if(allNotes.success==true){
          setnotes(allNotes.posts);
        }else{
          setnotes([]);
        }
      };



      const getPrivatePost=async ()=>{
        const allNotes=await getAllPrivatePostApi(localStorage.getItem('token'));
        if(allNotes.success==true){
          setPrivatePosts(allNotes.posts);
        }else{
          setPrivatePosts([]);
        }
        // const allNotes=await getAllNotesApi(localStorage.getItem('token'));
        // if(allNotes.success==true){
        //   setnotes(allNotes.notes);
        // }else{
        //   setnotes([]);
        // }
      };
     
      
      
      const addNote=async (note)=>{
        // const t=await addNoteApi(localStorage.getItem('token'),note.title,note.description,note.tag);
        // getNotes();

      }

      const deleteNote=async (id)=>{
        // await deleteNoteApi(localStorage.getItem('token'),id);
        // getNotes();
      }
      const requestJoin= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        await joinRequestApi(eventId,userId);
        getPublicPost()
      }

      const selectAuserForEvent= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        await selectMembersApi(localStorage.getItem('token'),eventId,userId);
        getPrivatePost()
      }

      const removeMembers= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        await removeMembersApi(localStorage.getItem('token'),eventId,userId);
        getPrivatePost();
      }
return(
    <NoteContext.Provider value={{notes,privatePost,getPublicPost,requestJoin,getPrivatePost,selectAuserForEvent,removeMembers}}>
    {props.children}
</NoteContext.Provider>
)
}
export default NoteState;