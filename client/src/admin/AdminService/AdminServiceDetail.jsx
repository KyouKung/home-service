import Sidebar from "../sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function AdminServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [serviceData, setServiceData] = useState();
  const [subService, setSubService] = useState([
    { name: "", cost: "", unit: "" },
    { name: "", cost: "", unit: "" },
  ]);
  const [categoryData, setCategoryData] = useState();
  const [categoryId, setCategoryId] = useState();

  // console.log(categoryData);

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
      const response = await axios.get(
        `http://localhost:3000/admin/service/${serviceId}`
      );
      const data = response.data.data;
      setServiceData(data);
      setSubService(data.sub_service);
      setCategoryId(data.category_id);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/category/${categoryId}`
        );
        setCategoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-screen h-screen bg-grey-100">
        <div className="h-[80px] bg-utils-white flex flex-row justify-between items-center drop-shadow-md">
          <div className="flex justify-center items-center ml-[50px]">
            <Link to="/admin/service">
              <button>
                <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(7).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNykuc3ZnIiwiaWF0IjoxNjk0ODY5OTEyLCJleHAiOjE3MjY0MDU5MTJ9.WtrMqGiZplevwF_H0hoxTPO3liPHHglw5HJ73Qfdgus&t=2023-09-16T13%3A11%3A47.366Z" />
              </button>
            </Link>
            <div className="flex flex-col justify-start">
              <div className="text-body4 text-grey-700 font-prompt ml-[50px]">
                บริการ
              </div>
              <div className="ml-[50px] text-fontHead2 text-utils-black font-prompt">
                {serviceData ? serviceData.service_name : null}
              </div>
            </div>
          </div>
          <div className="space-x-5 mr-[50px]">
            <Link to={`/admin/service/edit/${serviceId}`}>
              <button className="w-[112px] h-[44px] rounded-lg bg-blue-600 text-utils-white font-prompt text-fontHead5 hover:bg-blue-700">
                แก้ไข
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-[50px]">
          <div className="w-[90%] h-[100%] bg-utils-white border rounded-md border-grey-500 flex flex-col justify-start items-start">
            <div className="h-[380px] w-[100%] flex flex-col justify-around items-start pl-[40px]">
              <div>
                <div className="font-prompt text-grey-700 text-fontHead5">
                  ชื่อบริการ<span className="text-utils-red">*</span>
                  <div className="ml-[270px] -mt-[25px] font-prompt text-grey-700 text-fontHead5">
                    {serviceData ? serviceData.service_name : null}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-prompt text-grey-700 text-fontHead5">
                  หมวดหมู่<span className="text-utils-red">*</span>
                  <div className="ml-[270px] -mt-[25px] font-prompt text-grey-700 text-fontHead5">
                    {categoryData ? categoryData.category : null}
                  </div>
                </label>
              </div>

              <div className="flex flex-row">
                <div className="font-prompt text-grey-700 text-fontHead5">
                  รูปภาพ<span className="text-utils-red">*</span>
                </div>
                <div className="w-[433px] h-[143px] ml-[215px] border-2 border-dashed rounded-lg border-grey-300 flex flex-col justify-evenly items-center">
                  <div className="w-[433px] h-[143px] flex flex-col justify-evenly items-center">
                    {serviceData ? (
                      <img
                        className="w-[431px] h-[138px] rounded-lg object-cover border-grey-300"
                        src={serviceData.service_image}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="font-prompt text-grey-500 text-body3 ml-[273px] -mt-[36px]">
                ขนาดภาพที่แนะนำ: 1440 x 225 PX
              </div>
            </div>

            <div className="w-[100%] border-1 border-grey-700 flex justify-center">
              <hr className="w-[90%] border-1 border-grey-700" />
            </div>

            <div className="pl-[40px] mt-[30px] w-[90%]">
              <div className="font-prompt text-grey-700 text-fontHead5">
                รายการบริการย่อย
              </div>
              <div>
                {subService.map((item, index) => (
                  <div
                    className="flex flex-row justify-evenly items-center mt-[20px]"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <label className="font-prompt text-grey-700 text-body3">
                        ชื่อรายการ
                      </label>
                      <div className="w-[422px] h-[38px] font-prompt pl-4">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-prompt text-grey-700 text-body3">
                        ค่าบริการ / 1 หน่วย
                      </label>
                      <div className="w-[240px] h-[38px] font-prompt pl-4">
                        {item.cost}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-prompt text-grey-700 text-body3">
                        หน่วยบริการ
                      </label>
                      <div className="w-[240px] h-[38px] font-prompt pl-4">
                        {item.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[100%] border-1 border-grey-700 flex justify-center">
              <hr className="w-[90%] border-1 border-grey-700" />
            </div>

            <div className="pl-[40px] flex flex-row mt-[30px]">
              <p className="font-prompt text-grey-700 text-fontHead5">
                สร้างเมื่อ
              </p>
              <div className="ml-[227px] font-prompt">
                {serviceData ? formatDateTime(serviceData.created_at) : null}
              </div>
            </div>
            <div className="pl-[40px] flex flex-row mb-[30px] mt-[15px]">
              <p className="font-prompt text-grey-700 text-fontHead5">
                แก้ไขล่าสุด
              </p>
              <div className="ml-[215px] font-prompt">
                {serviceData ? formatDateTime(serviceData.updated_at) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminServiceDetail;
