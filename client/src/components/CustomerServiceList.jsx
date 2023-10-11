import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import jwtDecode from "jwt-decode";
import axios from "axios";

const CustomerServiceList = () => {
  const [serviceList, setServiceList] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = jwtDecode(token);
    setUserData(userData.user_id);
  }, []);

  useEffect(() => {
    getServiceList();
  }, [userData, serviceList]);

  const getServiceList = async () => {
    try {
      const results = await axios.get(
        `http://localhost:3000/order/${userData}`
      );
      setServiceList(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-Prompt bg-grey-100 flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-blue-600 flex flex-row justify-center items-center h-[100px] mb-10">
        <h1 className="text-utils-white text-[32px] font-[48px]">
          รายการคำสั่งซ่อม
        </h1>
      </div>
      <div className="flex flex-row justify-center items-start flex-1">
        <div className="flex flex-col pl-5 w-[10%] bg-utils-white rounded-md">
          <p className="my-3 text-[18px] text-grey-600">บัญชีผู้ใช้</p>
          <ul>
            <li className="my-5 text-[14px]">ข้อมูลผู้ใช้งาน</li>
            <li
              className="my-5 text-[14px] text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/customer");
              }}
            >
              รายการคำสั่งซ่อม
            </li>
            <li className="my-5 text-[14px]">ประวัติการซ่อม</li>
          </ul>
        </div>
        <div className="flex flex-col w-[40%]  ml-10">
          <div
            className="h-[500px] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Add custom CSS to hide the scrollbar */}
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {Array.isArray(serviceList) && serviceList.length > 0 ? (
              serviceList.map((service, index) => (
                <div
                  key={index}
                  className="my-2 h-[35%] bg-utils-white flex flex-row rounded-md p-4"
                >
                  <div className="w-[50%] text-left flex flex-col">
                    <h1 className="text-[24px] mb-2">
                      คำสั่งการซ่อมรหัส: {service.order_code_id}
                    </h1>
                    <p className="text-grey-600">
                      วันเวลาดำเนินการ {service.service_date} เวลา{" "}
                      {service.service_time} น.
                    </p>
                    <p className="text-grey-600">พนักงาน: สมาน เยี่ยมกู้ด</p>
                    <h2 className="mt-2 text-grey-800 text-[20px]">รายการ:</h2>
                    <p>{service.service_list}</p>
                  </div>
                  <div className="w-[50%] text-right">
                    <p className="mb-2">สถานะ: {service.order_status}</p>
                    <p>
                      ราคารวม:{" "}
                      {Number(service.total_price).toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>ยังไม่ได้จองบริการ</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerServiceList;
