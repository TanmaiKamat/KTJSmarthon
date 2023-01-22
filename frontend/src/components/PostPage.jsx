import React from 'react'
import {useNavigate} from 'react-router-dom';
import  "./PostPage.css";

export default function PostPage() {
    let parti=[{
        "ID":1,
        "Name":"Material Design Color Palette",
        "Link-title":"GitHub",
        "Link":"https://github.com/zavoloklom/material-design-color-palette",

    },

];
  return (
    
    <div class="demo">
  <h1>Material Design Responsive Table</h1>
  <h2>Table of my other Material Design works </h2>
  
 
  
  <div className="table-responsive-vertical shadow-z-1">
 
  <table id="table" class="table table-hover table-mc-light-blue">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Link</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
            parti.map((e,k)=>{
                return (
                    <tr key={k}>
                    <td data-title="ID">{e.ID}</td>
                    <td data-title="Name">{e.Name}</td>
                    <td data-title="Link">
                      <a href={e.Link} target="_blank">{e['Link-title']}</a>
                    </td>
                    <td data-title="Status">Completed</td>
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
