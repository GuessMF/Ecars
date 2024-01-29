import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";

interface AuthUser extends User {
  displayName: string | null;
}

export const useAuth = () => {
  // const [auth, setAuth] = useState(getAuth());
  const auth = getAuth();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    isAuth: !!user,
    email: user?.email || "",
    displayName: user?.displayName || null,
  };
};
