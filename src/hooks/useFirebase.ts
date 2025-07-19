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
  User,
} from "firebase/auth";
import FirebaseInitialize from "../lib/firebase/init";
import { useRouter } from "next/navigation";

FirebaseInitialize();

const useFirebase = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const router = useRouter();

  const provider = new GoogleAuthProvider();

  const registerUser = (email: string, password: string, name: string) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        saveUser(email, name, "POST");
        setUser(userCredential.user);

        updateProfile(auth.currentUser!, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setAuthError(error.message);
          });

        router.push("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
        setUser(userCredential.user);
      })
      .catch((error) => {
        setAuthError(error.message);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  };

  const googleSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setAuthError("");
        const user = result.user;
        saveUser(user.email!, user.displayName!, "PUT");
        router.push("/");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(() => {});
  };

  const saveUser = (email: string, displayName: string, method: string) => {
    const user = { email, displayName };
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setAdmin(data.admin));
    }
  }, [user?.email]);

  return {
    user,
    admin,
    isLoading,
    authError,
    registerUser,
    googleSignIn,
    loginUser,
    logOut,
  };
};

export default useFirebase;