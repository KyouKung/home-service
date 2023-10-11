import Sidebar from "../sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function AdminService() {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const navigate = useNavigate();

  function formatDateTime(dateTime) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(dateTime).toLocaleString("en-US", options);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/service");
      const data = response.data.data;
      setServiceData(data);
      setFilteredServiceData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDeleteConfirmationPopup = (service_id) => {
    setServiceToDelete(service_id);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteConfirmation = async () => {
    if (serviceToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/admin/service/${serviceToDelete}`
        );
        fetchData();
        setShowDeletePopup(false);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const filterService = (query) => {
    if (query.trim() === "") {
      setFilteredServiceData(serviceData);
    } else {
      setFilteredServiceData(
        serviceData.filter((serviceData) =>
          serviceData.service_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-screen h-screen bg-grey-100">
        <div className="h-[80px] bg-utils-white flex flex-row justify-between items-center drop-shadow-md">
          <p className="text-fontHead2 font-prompt ml-[50px]">บริการ</p>
          <div className="space-x-5 mr-[50px]">
            <input
              type="text"
              placeholder="  ค้นหาบริการ..."
              className="w-[350px] h-[44px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded pl-4"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                filterService(e.target.value);
              }}
            />
            <Link to="/admin/service/create">
              <button className="w-[185px] h-[44px] rounded-lg bg-blue-600 hover:bg-blue-700 space-x-2">
                <span className="text-utils-white font-prompt text-fontHead5">
                  เพิ่มบริการ
                </span>
                <span className="text-utils-white text-[16px] font-semibold">
                  +
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-[50px]">
          <table className="w-[90%] bg-utils-white border border-grey-500 table-auto text-left">
            <thead className="bg-grey-100 h-[41px]">
              <tr className="text-[14px] font-semibold font-prompt text-[#646C80]">
                <th className="w-[10%] text-center">ลำดับ</th>
                <th className="w-[20%] pl-6">ชื่อบริการ</th>
                <th className="w-[20%] pl-6">หมวดหมู่</th>
                <th className="w-[20%] pl-6">สร้างเมื่อ</th>
                <th className="w-[20%] pl-6">แก้ไขล่าสุด</th>
                <th className="w-[20%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceData.map((service) => (
                <tr
                  key={service.service_id}
                  className="border border-grey-500 h-[70px] text-body2 font-prompt"
                >
                  <td className="text-center">{service.service_id}</td>
                  <td className="pl-6 hover:underline">
                    <Link to={`/admin/service/detail/${service.service_id}`}>
                      {service.service_name}
                    </Link>
                  </td>
                  <td className="pl-6">{service.category_service.category}</td>
                  <td className="pl-6">{formatDateTime(service.created_at)}</td>
                  <td className="pl-6">{formatDateTime(service.updated_at)}</td>
                  <td className="text-center space-x-4">
                    <button
                      onClick={() =>
                        showDeleteConfirmationPopup(service.service_id)
                      }
                    >
                      <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(4).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNCkuc3ZnIiwiaWF0IjoxNjk0NzA0NTQ4LCJleHAiOjE3MjYyNDA1NDh9.5uJ9TjNs8ooMo6sf13l87hY6gkNlMUTzdgOsgu4onr0&t=2023-09-14T15%3A15%3A48.928Z" />
                    </button>
                    <Link to={`/admin/service/edit/${service.service_id}`}>
                      <button>
                        <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(5).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNSkuc3ZnIiwiaWF0IjoxNjk0NzA0NTk2LCJleHAiOjE3MjYyNDA1OTZ9.JsWEGknC_KLTHJ8srarMDmBZ6npWHg6DUx-PTEGSIEo&t=2023-09-14T15%3A16%3A36.771Z" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-[360px] h-[270px] flex flex-col justify-evenly items-center bg-utils-white drop-shadow-md rounded-xl relative">
            <div className="w-[30px] h-[30px]">
              <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(6).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNikuc3ZnIiwiaWF0IjoxNjk0ODY4MDQ0LCJleHAiOjE3MjY0MDQwNDR9.W7pdEYBxHgVvxILhGrLkDee8VNs0iKv5pUCmE5TeFaE&t=2023-09-16T12%3A40%3A39.658Z" />
            </div>
            <button
              className="absolute top-2 right-2 w-[24px] h-[24px]"
              onClick={handleCloseDeletePopup}
            >
              <AiOutlineClose />
            </button>
            <div className="text-fontHead2 font-prompt">ยืนยันการลบรายการ</div>
            <div className="text-body2 font-prompt text-center flex-wrap w-[280px]">
              คุณต้องการลบรายการ "
              {
                serviceData.find(
                  (service) => service.service_id === serviceToDelete
                )?.service_name
              }
              " ใช่หรือไม่
            </div>
            <div className="space-x-6">
              <button
                className="w-[112px] h-[44px] rounded-lg bg-blue-600 text-utils-white font-prompt text-fontHead5 hover:bg-blue-700"
                onClick={handleDeleteConfirmation}
              >
                ลบรายการ
              </button>
              <button
                className="w-[112px] h-[44px] rounded-lg bg-white text-blue-600 border-2 border-blue-600 font-prompt text-fontHead5 hover:bg-blue-100"
                onClick={handleCloseDeletePopup}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminService;
