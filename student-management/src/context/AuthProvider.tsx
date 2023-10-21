import { createContext, useState, ReactNode, useEffect } from "react";
import { Auth } from "../models/Auth";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";

export interface AuthContextProps {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth:  new  Auth(),
  setAuth: () => {},
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
 
 
  const [cookies, setCookie, removeCookie] = useCookies(["_auth"]);
  const [auth, setAuth] = useState<Auth>(cookies._auth);
   // On component mount, retrieve the authentication token from the cookie (if it exists)
   useEffect(() => {
    const _auth = cookies._auth;
    console.log("_auth" + _auth);
    if (_auth) {
      // Update the authentication state with the token retrieved from the cookie
      setAuth((prevAuth) => ({ ...prevAuth, _auth }));
      //setCookie("_auth", auth);
    }
     // Set the flag to indicate that authentication check is complete
  }, []);

  // When the authentication state changes, update the cookie
  useEffect(() => {
    console.log("_auth" + auth);
    if (auth) {
      // Set the authentication token in the cookie
      setCookie("_auth", auth); // Set the expiry as per your requirement
    } else {
      // If the token is empty, remove the cookie
      removeCookie("_auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
