import { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../../firebase';
import _firebase from 'firebase/app';
// @ts-ignore
const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<_firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (email: string, password: string) => {
    setIsLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setIsLoading(false);
        setUser(res.user);
        return res.user;
      });
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setIsLoading(false);
        setUser(res.user);
        return res.user;
      });
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const provider = new _firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
    return firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        setIsLoading(false);
        setUser(result.user);
      });
  };

  const signout = async () => {
    setIsLoading(true);
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
        setUser(null);
      });
  };

  const sendPasswordResetEmail = async (email: string) => {
    setIsLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        return true;
      });
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    setIsLoading(true);
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        setIsLoading(false);
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    signin,
    signInWithGoogle,
    signout,
    signup,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
