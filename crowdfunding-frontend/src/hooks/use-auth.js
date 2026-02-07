import { UseContext } from "react";
import { AuthContext } from "../components/AuthProvider";
export const useAuth = () => {
    return UseContext(AuthContext);
};

