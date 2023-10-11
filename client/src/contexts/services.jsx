import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ServiceContext = React.createContext();

const ServiceProvider = (props) => {
  const [services, setServices] = useState(null);

  const getServices = async () => {
    try {
      const result = await axios.get("http://localhost:3000/admin/service");
      setServices(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <ServiceContext.Provider value={{ services }}>
      {props.children}
    </ServiceContext.Provider>
  );
};

const useService = () => React.useContext(ServiceContext);

export { ServiceProvider, useService };
