// // UserDirectory.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function UserDirectory() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//         console.log(response.data)
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div style={{display:"flex",flexDirection:"column", gap:"20px",justifyContent:"center",marginLeft:"20px",marginRight:"20px",textAlign:"center",border:"1px solid gray",height:"100%",paddingTop:"20px",paddingBottom:"20px"}}>
//       <h1 style={{fontFamily:"monospace"}}>User Directory</h1>
//       {users.map(user => (
        
//           <Link to={`/user/${user.id}`} style={{textDecoration:"none",color:"black",fontSize:"large",fontWeight:"600"}} >
//         <div style={{display:"flex", justifyContent:"space-between",background:"#cff6fc",border:"3px sloid black",borderRadius:"5px",paddingBottom:"10px",paddingTop:"10px",textAlign:"center",boxSizing:"border-box",fontFamily:"monospace"}}>

//             <div style={{marginLeft:"10px"}}>Name : {user.name}</div>
//             <div style={{marginRight:"10px"}} >Posts: {user.id}</div>
//         </div>
//           </Link>
//       ))}
//     </div>
//   );
// }

// export default UserDirectory;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

function UserDirectory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-directory-container">
      <h1 style={{ fontFamily: 'monospace' }}>User Directory</h1>
      {users.map(user => (
        <Link to={`/user/${user.id}`} className="user-card" key={user.id}>
          <div style={{ marginLeft: '10px' }}>Name: {user.name}</div>
          <div style={{ marginRight: '10px' }}>Posts: {user.id}</div>
        </Link>
      ))}
    </div>
  );
}

export default UserDirectory;
