import NoteContext from "./noteContext";
import { useState,useEffect } from "react";
import getAllNotesApi,{deleteNoteApi,updateNoteApi,addNoteApi} from "./ApiCalls";
const NoteState=(props)=>{
    
     
      const [notes, setnotes] = useState([]);
      const getNotes=async ()=>{
        const allNotes=await getAllNotesApi(localStorage.getItem('token'));
        if(allNotes.success==true){
          setnotes(allNotes.notes);
        }else{
          setnotes([]);
        }
      };

     
      
      
      const addNote=async (note)=>{
        const t=await addNoteApi(localStorage.getItem('token'),note.title,note.description,note.tag);
        getNotes();

      }

      const deleteNote=async (id)=>{
        await deleteNoteApi(localStorage.getItem('token'),id);
        getNotes();
      }
      const updateNote= async (id,title,description,tag)=>{
        for(var i=0;i<notes.length;i++){
          if(notes[i]._id==id){
            const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
          }
        }
        getNotes();
      }
return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,updateNote}}>
    {props.children}
</NoteContext.Provider>
)
}
export default NoteState;