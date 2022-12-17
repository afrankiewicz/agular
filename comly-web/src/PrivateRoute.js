import { getToken } from "./utils";
import { Navigate } from "react-router";

export default function PrivateRoute({children}) {
  const token = getToken();
  return token ? children : <Navigate to="/login"/>
}