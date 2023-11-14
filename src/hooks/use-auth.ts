// import {useEffect, useState} from "react";
// import {useSelector} from "react-redux";
// import {useAppSelector} from "./redux-hooks";
// import {getAuth, onAuthStateChanged, User} from "firebase/auth";

// interface AuthUser extends User {
//   displayName: string | null;
// }
// export function useAuth() {
//   const {email, token, id, displayName} = useAppSelector((state) => state.user);
//   const [user, setUser] = useState<AuthUser | null>(null);
//   return {
//     isAuth: !!email,
//     displayName,
//     email,
//     token,
//     id,
//   };
// }

import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";

interface AuthUser extends User {
  displayName: string | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState(getAuth());
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
    displayName: user?.displayName || null, // Уточнение здесь
  };
};
