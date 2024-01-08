import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import UserDetails from './UserDetails';
import UserDirectory from './UserDirectory';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<UserDirectory/>}/>
          <Route path = "/user/:userId" element={<UserDetails/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App