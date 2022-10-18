import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
  const { dispatch } = useAuthContext();
  const signOut = () => {
    localStorage.removeItem("LearnItAuth");
    dispatch({ type: "LOGOUT" });
  };
  return { signOut };
};
