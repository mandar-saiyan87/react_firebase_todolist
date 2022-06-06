import React from 'react';
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./FirebaseConfig/firebaseConfig"
import { signInWithPopup } from "firebase/auth"
import Logout from './Logout';

function Login() {

  // useNavigate to handle navigations
  const navigate = useNavigate();

  async function userLogin() {
    await signInWithPopup(auth, provider)
    console.log(auth.currentUser);
    localStorage.setItem('token', auth.currentUser.accessToken)
    navigate('/')
  }


  return (

    <>

      <div className='login'>
        <div>
          {!localStorage.getItem('token') ? <GoogleButton onClick={userLogin} /> : <Logout />}
        </div>
      </div>
    </>

  );
}

export default Login;
