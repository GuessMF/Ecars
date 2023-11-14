import {useSelector} from "react-redux";
import {useAppSelector} from "./redux-hooks";

export function useAuth() {
  const {email, token, id} = useAppSelector((state) => state.user);
  return {
    isAuth: !!email,
    displayName,
    email,
    token,
    id,
  };
}
