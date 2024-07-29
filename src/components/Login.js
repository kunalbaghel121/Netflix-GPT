import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import {BG_URL, USER_AVATAR} from "../utils/constants"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullName=useRef();
  const [errorMessage, setErrorMessage] = useState();

  const dispatch=useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value, photoURL: USER_AVATAR
          }).then(() => {
            // Profile updated!
            const {uid,email,displayName,photoURL} =auth.currentUser ;
        dispatch(addUser({ uid: uid,email:email, displayName: displayName, photoURL:photoURL}));
          
          
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
            // ...
          });
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage) 
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL}
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={fullName} 
            className="p-4 my-4 w-full bg-gray-800"
            action=""
            type="text"
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="p-4 my-4 w-full bg-gray-800"
          action=""
          type="text"
          placeholder="Email Address"
        ></input>
        <input
          ref={password}
          className="p-4 my-4 w-full  bg-gray-800"
          action=""
          type="password"
          placeholder="Password"
        ></input>
        <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? SIgn Up Now"
            : "Already a user? Sign In"}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
