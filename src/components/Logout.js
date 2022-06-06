import React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseConfig/firebaseConfig"
import { signOut } from "firebase/auth"

function Logout(props) {


  const navigate = useNavigate();

  function userLogout() {
    signOut(auth);
    localStorage.clear();
    navigate('/login')
  }

  return (
    <button type="submit" className='logout' onClick={userLogout}>Logout</button>
  );
}

export default Logout;
