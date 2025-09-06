// src/UserProfile.jsx
import React, { useContext } from 'react';
import UserContext from './Usercontext';

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;