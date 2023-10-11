import { useAuth } from "../contexts/authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminCategory from "../admin/AdminCategory/AdminCategory.jsx";

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      let data = auth.state.userData;
      console.log(data);

      // Check if adminRole is null or undefined
      if (data == null || data.role !== "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <AdminCategory />
    </>
  );
};

export default Admin;
