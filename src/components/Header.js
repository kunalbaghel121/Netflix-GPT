import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'
import React, { useEffect } from 'react'
import { LOGO } from "../utils/constants";
import {USER_AVATAR} from "../utils/constants"

const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user = useSelector(store=> store.user)

  const handleSignout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      navigate("/error") 
    });
  }

  //checks auth and redirects to browse or login page
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({ uid: uid,email:email, displayName: displayName, photoURL:photoURL}));
        navigate("/browse")

       

        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
        
      }
    });

    //unsubscribe when component unmounts
    return ()=>{
      unsubscribe();

    }

   },[])
  


  return (
    <div className='absolute w-screen px-35 py-5 bg-gradient-to-b from-black z-10 flex  justify-between'>
      <img className="w-40 mx-10 " src={LOGO} alt="logo" />
    
    
      {user && (<div className='flex p-2 px-20'>
      <img className="w-12 h-12  " src={user?.photoURL} alt="usericon" />
    <button className='font-bold text-white ' onClick={handleSignout}>(Sign Out)</button>
    </div>)}

    </div>

    
  )
}

export default Header
