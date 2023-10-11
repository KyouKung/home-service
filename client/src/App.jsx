import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Home from "./components/Home";
import OurServices from "./components/OurServices";
import { ServiceProvider } from "./contexts/services";
import AdminCategoryCreate from "./admin/AdminCategory/AdminCategoryCreate.jsx";
import AdminCategoryEdit from "./admin/AdminCategory/AdminCategoryEdit.jsx";
import AdminService from "./admin/AdminService/AdminService.jsx";
import AdminServiceCreate from "./admin/AdminService/AdminServiceCreate.jsx";
import AdminCategory from "./admin/AdminCategory/AdminCategory";
import AdminServiceEdit from "./admin/AdminService/AdminServiceEdit.jsx";
import AdminServiceDetail from "./admin/AdminService/AdminServiceDetail.jsx";
import { useEffect, useState } from "react";
import Payment from "./components/Payment";
import CustomerServiceList from "./components/CustomerServiceList";
import Register from "./components/Register";

const App = () => {
  const [validateRole, setValidateRole] = useState("user");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setValidateRole(role);
    }
  }, []);

  const userRoutes = (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<OurServices />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/customer" element={<CustomerServiceList />} />
      <Route path="/register" element={<Register />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route path="/" element={<Admin />} />
      <Route path="/admin/category" element={<AdminCategory />} />
      <Route path="/admin/category/create" element={<AdminCategoryCreate />} />
      <Route
        path="/admin/category/edit/:categoryId"
        element={<AdminCategoryEdit />}
      />
      <Route path="/admin/service" element={<AdminService />} />
      <Route path="/admin/service/create" element={<AdminServiceCreate />} />
      <Route
        path="/admin/service/edit/:serviceId"
        element={<AdminServiceEdit />}
      />
      <Route
        path="/admin/service/detail/:serviceId"
        element={<AdminServiceDetail />}
      />
    </>
  );
  return (
    <>
      <ServiceProvider>
        <Routes>
          {validateRole === "user" ? userRoutes : null}
          {validateRole === "admin" ? adminRoutes : null}
        </Routes>
      </ServiceProvider>
    </>
  );
};

export default App;
