import Sidebar from "../sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function AdminServiceEdit() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  // dropdown
  const [categoryData, setCategoryData] = useState();
  const [serviceName, setServiceName] = useState();
  const [category, setCategory] = useState();
  const [subService, setSubService] = useState([
    { name: "", cost: "", unit: "" },
    { name: "", cost: "", unit: "" },
  ]);

  const [serviceImageData, setServiceImageData] = useState();
  const [serviceImage, setServiceImage] = useState([]);

  // console.log(serviceImageData);

  // validation
  const [serviceNameError, setServiceNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subServiceError, setSubServiceError] = useState(false);

  const [serviceData, setServiceData] = useState();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const addNewItem = () => {
    setSubService([...subService, { name: "", cost: "", unit: "" }]);
  };

  const removeItem = (index) => {
    if (subService.length > 1) {
      const updatedItems = [...subService];
      updatedItems.splice(index, 1);
      setSubService(updatedItems);
    }
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setServiceImage({
      [uniqueId]: event.target.files[0],
    });
  };

  const handleRemoveImage = (event, serviceImageKey) => {
    event.preventDefault();
    delete serviceImage[serviceImageKey];
    setServiceImage({ ...serviceImage });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServiceNameError(false);
    setCategoryError(false);
    setSubServiceError(false);

    if (
      !serviceName ||
      !category ||
      subService.length === 0 ||
      subService.every((item) => !item.name || !item.cost || !item.unit)
    ) {
      setServiceNameError(!serviceName);
      setCategoryError(!category);
      setSubServiceError(
        subService.length === 0 ||
          subService.every((item) => !item.name || !item.cost || !item.unit)
      );
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("category", category);

    subService.forEach((item, index) => {
      formData.append(`subService[${index}][name]`, item.name);
      formData.append(`subService[${index}][cost]`, item.cost);
      formData.append(`subService[${index}][unit]`, item.unit);
    });

    for (let serviceImageKey in serviceImage) {
      formData.append("service_image", serviceImage[serviceImageKey]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/admin/service/${serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/admin/service");
      console.log("Created successfully", response.data);
    } catch (error) {
      console.error("Error creating service", error);
    }
  };

  const loadFile = (file) => {
    console.log(file);
    return URL.createObjectURL(file);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/service/${serviceId}`
      );
      const data = response.data.data;
      setServiceData(data);
      setServiceName(data.service_name);
      setCategory(data.category_service.category_id);

      const subServiceData = data.sub_service || [];
      setSubService(subServiceData);

      setServiceImageData(data.service_image);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  const showDeleteConfirmationPopup = (serviceName) => {
    setServiceToDelete(serviceName);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteConfirmation = async () => {
    if (serviceToDelete) {
      try {
        await axios.delete(`http://localhost:3000/admin/service/${serviceId}`);
        navigate("/admin/service");
        setShowDeletePopup(false);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/category"
        );
        setCategoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }

    fetchCategories();
  }, [categoryData]);

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
            <Link to="/admin/service">
              <button className="w-[112px] h-[44px] rounded-lg bg-utils-white text-blue-600 border-2 border-blue-600 font-prompt text-fontHead5 hover:bg-blue-100">
                ยกเลิก
              </button>
            </Link>
            <button
              className="w-[112px] h-[44px] rounded-lg bg-blue-600 text-utils-white font-prompt text-fontHead5 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              ยืนยัน
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-[50px]">
          <div className="w-[90%] h-[100%] bg-utils-white border rounded-md border-grey-500 flex flex-col justify-start items-start">
            <div className="h-[380px] w-[100%] flex flex-col justify-around items-start pl-[40px]">
              <div>
                <label className="font-prompt text-grey-700 text-fontHead5">
                  ชื่อบริการ<span className="text-utils-red">*</span>
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className={`w-[400px] h-[44px] relative border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded ml-[200px] pl-4 ${
                    serviceNameError ? "border-utils-red" : null
                  }`}
                />
                {serviceNameError && (
                  <div className="text-utils-red font-prompt text-body3 absolute left-[636px] top-[200px]">
                    โปรดกรอกชื่อบริการ
                  </div>
                )}
              </div>

              <div>
                <label className="font-prompt text-grey-700 text-fontHead5">
                  หมวดหมู่<span className="text-utils-red">*</span>
                </label>
                {categoryData && categoryData.length > 0 ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-[400px] h-[44px] relative border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded ml-[203px] pl-4 ${
                      categoryError ? "border-utils-red" : null
                    }`}
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    {categoryData.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
              {categoryError && (
                <div className="text-utils-red font-prompt text-body3 absolute left-[636px] top-[285px]">
                  โปรดเลือกหมวดหมู่
                </div>
              )}

              <div className="flex flex-row">
                <div className="font-prompt text-grey-700 text-fontHead5">
                  รูปภาพ<span className="text-utils-red">*</span>
                </div>
                <div className="w-[433px] h-[143px] ml-[215px] border-2 border-dashed rounded-lg border-grey-300 flex flex-col justify-evenly items-center">
                  {serviceImageData ? (
                    <div className="relative">
                      <img
                        className="w-[431px] h-[138px] rounded-lg object-cover border-grey-300"
                        src={serviceImageData}
                      />
                      <button
                        className="flex items-center justify-center absolute right-0 mt-1 font-prompt text-blue-600 text-fontHead5 underline"
                        onClick={() => setServiceImageData(null)}
                      >
                        ลบรูปภาพ
                      </button>
                    </div>
                  ) : (
                    <>
                      {Object.keys(serviceImage).length === 0 ? (
                        <label htmlFor="upload">
                          <input
                            id="upload"
                            name="serviceImage"
                            type="file"
                            onChange={handleFileChange}
                            disabled={Object.keys(serviceImage).length > 0}
                            accept="image/jpg, image/jpeg, image/png"
                            hidden
                          />
                          <div className="w-[433px] h-[143px] flex flex-col justify-evenly items-center">
                            <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Path.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1BhdGguc3ZnIiwiaWF0IjoxNjk1MjI0MzExLCJleHAiOjE3MjY3NjAzMTF9.Qiv_3FxUtjIr7JbItUeXO08wK42V8ZZrmeFz4xsM-SY&t=2023-09-20T15%3A38%3A28.874Z" />
                            <div className="font-prompt text-blue-600 text-body3">
                              อัพโหลดรูปภาพ{" "}
                              <span className="font-prompt text-grey-700 text-body3">
                                หรือ ลากและวางที่นี่
                              </span>
                            </div>
                            <p className="font-prompt text-grey-700 text-body4">
                              PNG, JPG ขนาดไม่เกิน 5MB
                            </p>
                          </div>
                        </label>
                      ) : null}
                      {Object.keys(serviceImage).map((serviceImageKey) => {
                        const file = serviceImage[serviceImageKey];
                        return (
                          <div key={serviceImageKey} className="relative">
                            <img
                              className="w-[431px] h-[138px] rounded-lg object-cover border-grey-300"
                              // src={URL.createObjectURL(file)}
                              src={loadFile(file)}
                              alt={file.name}
                            />
                            <button
                              className="flex items-center justify-center absolute right-0 mt-1 font-prompt text-blue-600 text-fontHead5 underline"
                              onClick={(event) =>
                                handleRemoveImage(event, serviceImageKey)
                              }
                            >
                              ลบรูปภาพ
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
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
              {subServiceError && (
                <div className="text-utils-red font-prompt text-body3 absolute bottom-[255px] left-[435px]">
                  โปรดกรอกรายการบริการย่อยอย่างน้อย 1 รายการ
                </div>
              )}
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
                      <input
                        type="text"
                        className={`w-[422px] h-[38px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded pl-4 ${
                          subServiceError ? "border-utils-red" : null
                        }`}
                        value={item.name}
                        onChange={(e) => {
                          const updatedItems = [...subService];
                          updatedItems[index].name = e.target.value;
                          setSubService(updatedItems);
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-prompt text-grey-700 text-body3">
                        ค่าบริการ / 1 หน่วย
                      </label>
                      <input
                        type="number"
                        className={`w-[240px] h-[38px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded pl-4 ${
                          subServiceError ? "border-utils-red" : null
                        }`}
                        value={item.cost}
                        onChange={(e) => {
                          const updatedItems = [...subService];
                          updatedItems[index].cost = e.target.value;
                          setSubService(updatedItems);
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-prompt text-grey-700 text-body3">
                        หน่วยบริการ
                      </label>
                      <input
                        type="text"
                        className={`w-[240px] h-[38px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded pl-4 ${
                          subServiceError ? "border-utils-red" : null
                        }`}
                        value={item.unit}
                        onChange={(e) => {
                          const updatedItems = [...subService];
                          updatedItems[index].unit = e.target.value;
                          setSubService(updatedItems);
                        }}
                      />
                    </div>
                    <button
                      className="font-prompt text-grey-400 text-fontHead5 underline"
                      onClick={() => removeItem(index)}
                    >
                      ลบรายการ
                    </button>
                  </div>
                ))}

                <button
                  className="w-[185px] h-[44px] mt-[30px] mb-[30px] rounded-lg bg-utils-white border-2 border-blue-600 hover:bg-blue-100 space-x-1"
                  onClick={addNewItem}
                >
                  <span className="text-blue-600 font-prompt text-fontHead5">
                    เพิ่มรายการ
                  </span>
                  <span className="text-blue-600 text-[16px] font-semibold">
                    +
                  </span>
                </button>
              </div>
            </div>

            <div className="w-[100%] border-1 border-grey-700 flex justify-center">
              <hr className="w-[90%] border-1 border-grey-700" />
            </div>

            <div className="pl-[40px] flex flex-row mt-[30px]">
              <p className="font-prompt text-grey-700 text-fontHead5">
                สร้างเมื่อ
              </p>
              <span className="ml-[227px] font-prompt text-grey-700 text-fontHead5">
                {serviceData ? formatDateTime(serviceData.created_at) : null}
              </span>
            </div>
            <div className="pl-[40px] flex flex-row mb-[30px] mt-[15px]">
              <p className="font-prompt text-grey-700 text-fontHead5">
                แก้ไขล่าสุด
              </p>
              <span className="ml-[215px] font-prompt text-grey-700 text-fontHead5">
                {serviceData ? formatDateTime(serviceData.updated_at) : null}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => showDeleteConfirmationPopup(serviceData.service_name)}
          className="flex space-x-2 mt-[15px] ml-[1485px]"
        >
          <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(4).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNCkuc3ZnIiwiaWF0IjoxNjk0NzA0NTQ4LCJleHAiOjE3MjYyNDA1NDh9.5uJ9TjNs8ooMo6sf13l87hY6gkNlMUTzdgOsgu4onr0&t=2023-09-14T15%3A15%3A48.928Z" />
          <span className="flex font-prompt text-[#80899C] text-fontHead5 underline">
            ลบบริการ
          </span>
        </button>

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
              <div className="text-fontHead2 font-prompt">
                ยืนยันการลบรายการ
              </div>
              <div className="text-body2 font-prompt text-center flex-wrap w-[280px]">
                คุณต้องการลบรายการ "{serviceToDelete}" ใช่หรือไม่
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
    </div>
  );
}

export default AdminServiceEdit;
