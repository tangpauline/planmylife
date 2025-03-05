import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/auth/session", {
            withCredentials: true,
        })
        .then(res => {
            setUser(res.data.user);
        })
        .catch((error) => {
            setUser(null);
            console.error("Error with auth:", error);
        })
        .finally(() => {
            setLoading(false);
        });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);