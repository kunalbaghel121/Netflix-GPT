import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {addUser, removeUser} from '../utils/userSlice'
import React, { useEffect } from 'react'
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import {SUPPORTED_LANGUAGES} from "../utils/constants"
import { changeLanguage } from "../utils/configSlice";

const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user = useSelector(store=> store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick= ()=>{
    // toggle gpt search
    dispatch(toggleGptSearchView());
    console.log("clicked")
   
  }

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

   const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  


  return (
    <div className='absolute w-screen px-35 py-5 bg-gradient-to-b from-black z-10 flex  justify-between'>
      <img className="w-40 mx-10 " src={LOGO} alt="logo" />
    
    
      {user && (<div className='flex p-2 px-20'>
      {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
      <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
      <img className="w-12 h-12  " src={user?.photoURL} alt="usericon" />
    <button className='font-bold text-white ' onClick={handleSignout}>(Sign Out)</button>
    </div>)}

    </div>

    
  )
}

export default Header
