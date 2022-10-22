import React, { useEffect, useState } from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import FirebaseInitialize from "../Firebase/Firebase.init"

FirebaseInitialize()

const useFirebase = () => {
  const auth = getAuth()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState("")

  const provider = new GoogleAuthProvider()

  const registerUser = (email, password, name, location, navigate) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("")
        const newUser = { email, displayName: name }

        setUser(newUser)

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => { setAuthError(error.message)})
        
        const destination = location?.state?.from || "/"
        navigate(destination)
      })
      .catch((error) => {
        setAuthError(error.message)
        setUser({})
      })
      .finally(() => setIsLoading(false))
  }
  //log in user
  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/"
        navigate(destination)
        // Signed in
        //  if(location.state?.form){
        //    Navigate (location.state.from);
        //  }
        const user = userCredential.user
        setUser(user)
        // ...
      })
      .catch((error) => {
        setAuthError(error.message)
        setUser({})
      })
      .finally(() => setIsLoading(false))
  }
  //google log in
  const googleSignIn = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setAuthError("")
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        const user = result.user
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message)

        const email = error.customData.email

        const credential = GoogleAuthProvider.credentialFromError(error)
      })
      .finally(() => setIsLoading(false))
  }
  //observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser({})
      }
    })
    return () => unsubscribe
  }, [])

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }
  return {
    user,
    isLoading,
    registerUser,
    googleSignIn,
    loginUser,
    logOut,
  }
}

export default useFirebase
