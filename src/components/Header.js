import React from 'react'
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate=useNavigate();
  const user = useSelector(store=> store.user)

  const handleSignout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  


  return (
    <div className='absolute w-screen px-40 py-5 bg-gradient-to-b from-black z-10 flex  justify-between'>
      <img className="w-40 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
    
    
      {user && (<div className='flex p-2'>
      <img className="w-12 h-12  " src={user?.photoURL} alt="usericon" />
    <button className='font-bold text-white' onClick={handleSignout}>(Sign Out)</button>
    </div>)}

    </div>

    
  )
}

export default Header
