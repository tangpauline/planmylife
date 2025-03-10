import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      axios.get(process.env.REACT_APP_SERVER_URL + "/auth/session", {
        withCredentials: true,
      })
      .then(res => {
        setUser(res.data.result)
      })
      .catch(err => {
        setUser(null);
        console.log("Error auth context:", err)
      })
      .finally(() => {
        setLoading(false);
      });
    };
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