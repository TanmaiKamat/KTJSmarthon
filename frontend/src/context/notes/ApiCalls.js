const port=process.env.PORT
const host=`https://inotebook-dazz.herokuapp.com`;

async function getAllNotesApi(auth) {
    const url=`${host}/api/notes/allNotes`;
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : `${auth}`
      } });
  
    return response.json();
  
  }

  async function deleteNoteApi(auth,id) {

    const url=`${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : `${auth}`
      } });
  
    return response.json();
  
  }
  async function updateNoteApi(auth,id,title,description,tag) {
      const url=`${host}/api/notes/updateNote/${id}`
  const response = await fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : `${auth}`
    },
   body: JSON.stringify({title,description,tag}) });

  return response.json();

}
async function addNoteApi(auth,title,description,tag) {
    const url=`${host}/api/notes/addNote`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : `${auth}`
    },
   body: JSON.stringify({title,description,tag}) });

  return response.json();

}


async function loginApi(email,password) {
  const url=`${host}/api/auth/login`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify({email,password}) });

  return response.json();

}


async function createUserApi(name,email,password) {
  const url=`${host}/api/auth/createUser`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify({name,email,password}) });

  return response.json();

}


// async function postData(url = '', data = {}) {
//   const response = await fetch(url, {
//     method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json'
//     },
//    body: JSON.stringify(data) });

//   return response.json();

// }

export {deleteNoteApi,updateNoteApi,addNoteApi,loginApi,createUserApi};
export default getAllNotesApi;


