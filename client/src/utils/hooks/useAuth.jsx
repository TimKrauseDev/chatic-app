import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from 'utils/hooks/useStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null);;
    const navigate = useNavigate();


    const value = useMemo(() => {
        const login = async (data) => {
            setUser(data);
            navigate("/chat");
        };

        const logout = () => {
            setUser(null);
            navigate("/", { replace: true });
        };
  
        return { user, login, logout }

  }, [user, setUser, navigate]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);