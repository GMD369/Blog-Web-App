// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = () => {
      try {
        const tokens = localStorage.getItem("authTokens");
        if (tokens) {
          const parsedTokens = JSON.parse(tokens);
          if (parsedTokens.access) {
            const decodedUser = jwtDecode(parsedTokens.access);
            setUser(decodedUser);
            setAuthTokens(parsedTokens);
          } else {
            localStorage.removeItem("authTokens");
          }
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        localStorage.removeItem("authTokens");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        const decodedUser = jwtDecode(data.access);
        setUser(decodedUser);
        localStorage.setItem("authTokens", JSON.stringify(data));
        return { success: true };
      } else {
        throw new Error(data.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const updateToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        const decodedUser = jwtDecode(data.access);
        setUser(decodedUser);
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        console.error("Token refresh failed:", data);
        logoutUser();
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logoutUser();
    }
  };

  useEffect(() => {
    let interval = null;

    if (authTokens) {
      const token = jwtDecode(authTokens.access);
      const expiresIn = token.exp * 1000 - Date.now();

      if (expiresIn > 0) {
        interval = setInterval(() => {
          updateToken();
        }, Math.max(expiresIn - 300000, 60000));
      } else {
        updateToken();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [authTokens]);

  const contextData = {
    user,
    authTokens,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
