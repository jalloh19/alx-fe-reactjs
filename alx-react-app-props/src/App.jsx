// src/App.jsx
import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './Usercontext';

function App() {
  const userData = { 
    name: "Jane Doe", 
    email: "jane.doe@example.com" 
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;


