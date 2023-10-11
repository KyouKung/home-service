import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
    userData: null,
  });
  const navigate = useNavigate();

  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      await axios
        .get(`http://localhost:3000/auth/${userDataFromToken.user_id}`)
        .then((result) => {
          setState({
            ...state,
            user: userDataFromToken,
            userData: result.data.data[0],
            loading: false,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setState({
            ...state,
            loading: false,
            error: "Error fetching user data",
          });
        });
    } else {
      const userDataFromToken = jwtDecode(token);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setState({
          ...state,
          user: userDataFromToken,
          userData: JSON.parse(storedUserData),
          loading: false,
        });
      } else {
        setState({
          ...state,
          loading: false,
        });
      }
    }
  };
  useEffect(() => {
    fetchAuth();
  }, []);

  const login = async (data) => {
    try {
      const result = await axios.post(`http://localhost:3000/auth/login`, data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", result.data.role);
      const userData = result.data.userData;
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken, userData: userData });
      if (result.data.role === "admin") {
        navigate("/");
        window.location.reload();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setState({ ...state, user: null, error: null });
    navigate("/");
    window.location.reload();
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
