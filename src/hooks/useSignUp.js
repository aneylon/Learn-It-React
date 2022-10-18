import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_API + "/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      if (response.ok) {
        // save user to local storage
        localStorage.setItem("LearnItAuth", JSON.stringify(json.token));

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { signUp, isLoading, error };
};
