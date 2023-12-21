import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import UserDirectory from './UserDirectory';
import UserDetails from './UserDetails';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<><UserDirectory/></>} />
        <Route path="/user/:userId" element={<UserDetails/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
