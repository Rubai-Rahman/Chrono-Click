import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken,
  User, // Import User type
} from "firebase/auth";
import FirebaseInitialize from "../lib/firebase/init";
import { useRouter } from "next/navigation";

FirebaseInitialize();

const useFirebase = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null); // Use User type
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const provider = new GoogleAuthProvider();

  const registerUser = (email: string, password: string, name: string, location: any) => { // Add types
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name };
        saveUser(email, name, "POST");
        setUser(userCredential.user); // Set user from userCredential

        updateProfile(auth.currentUser!, { // Use non-null assertion
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setAuthError(error.message);
          });

        const destination = location?.state?.from || "/";
        router.push(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email: string, password: string, location: any) => { // Add types
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        router.push(destination);

        setUser(userCredential.user);
        // localStorage.setItem('user',JSON.stringify(user)) // To be handled
      })
      .catch((error) => {
        setAuthError(error.message);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  };

  const googleSignIn = (location: any) => { // Add type
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setAuthError("");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        saveUser(user.email!, user.displayName!, "PUT"); // Use non-null assertion
        const destination = location?.state?.from || "/";
        router.push(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
        // const email = error.customData.email; // This might not exist on all errors
        // const credential = GoogleAuthProvider.credentialFromError(error); // This might not exist on all errors
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // Renamed user to currentUser to avoid conflict
      if (currentUser) {
        setUser(currentUser);
        getIdToken(currentUser).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe(); // Call unsubscribe
  }, [auth]); // Add auth to dependency array

  const logOut = () => {
    signOut(auth)
      // localStorage.removeItem('user',user) // To be handled
      .then(() => {
        setUser(null); // Clear user on logout
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const saveUser = (email: string, displayName: string, method: string) => { // Add types
    const user = { email, displayName };
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, { // Use env var for API base URL
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  //Admin
  useEffect(() => {
    if (user?.email) { // Only fetch if user.email exists
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.email}`) // Use env var for API base URL
        .then((res) => res.json())
        .then((data) => setAdmin(data.admin));
    }
  }, [user?.email]); // Depend on user.email

  return {
    user,
    token,
    admin,
    isLoading,
    registerUser,
    googleSignIn,
    loginUser,
    logOut,
  };
};

export default useFirebase;