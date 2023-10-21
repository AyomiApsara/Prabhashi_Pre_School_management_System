import { useContext } from "react";
import AuthContext, { AuthContextProps } from "../context/AuthProvider";

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};

export default useAuth;
