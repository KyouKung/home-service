import Sidebar from "../sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function AdminCategoryEdit() {
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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
        `http://localhost:3000/admin/category/${categoryId}`
      );
      setCategoryData(response.data.data);
      setCategory(response.data.data.category);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingCategories.map((item) => item.category).includes(category)) {
      setCategoryError(true);
      return;
    }

    if (categoryData.category !== category) {
      try {
        await axios.put(`http://localhost:3000/admin/category/${categoryId}`, {
          category,
        });
        navigate("/admin/category");
        console.log("Updated successfully");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      setCategoryError(true);
    }
  };

  const showDeleteConfirmationPopup = (categoryName) => {
    setCategoryToDelete(categoryName);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteConfirmation = async () => {
    if (categoryToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/admin/category/${categoryId}`
        );
        navigate("/admin/category");
        setShowDeletePopup(false);
      } catch (error) {
        console.error("Error deleting category:", error);
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
        setExistingCategories(response.data.data);
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
            <Link to="/admin/category">
              <button>
                <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(7).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNykuc3ZnIiwiaWF0IjoxNjk0ODY5OTEyLCJleHAiOjE3MjY0MDU5MTJ9.WtrMqGiZplevwF_H0hoxTPO3liPHHglw5HJ73Qfdgus&t=2023-09-16T13%3A11%3A47.366Z" />
              </button>
            </Link>
            <div className="flex flex-col justify-start">
              <div className="text-body4 text-grey-700 font-prompt ml-[50px]">
                หมวดหมู่
              </div>
              <div className="ml-[50px] text-fontHead2 text-utils-black font-prompt">
                {categoryData.category}
              </div>
            </div>
          </div>
          <div className="space-x-5 mr-[50px]">
            <Link to="/admin/category">
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
          <div className="w-[90%] h-[334px] bg-utils-white border rounded-md border-grey-500 flex flex-col justify-between ">
            <div className="flex justify-start mt-[40px] items-center relative">
              <label className="font-prompt text-grey-700 text-fontHead5 ml-[30px]">
                ชื่อหมวดหมู่<span className="text-utils-red">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[400px] h-[44px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded ml-[200px] pl-4"
              />
              {categoryError && (
                <div className="text-utils-red font-prompt text-body3 absolute left-[320px] top-[60px]">
                  ชื่อหมวดหมู่ต้องไม่ซ้ำกับชื่อเดิม
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <hr className="w-[90%] border-grey-700" />
            </div>

            <div className="ml-[30px] flex flex-row">
              <p className="font-prompt text-grey-700 text-fontHead5">
                สร้างเมื่อ
              </p>
              <span className="ml-[227px] font-prompt text-fontHead4">
                {formatDateTime(categoryData.created_at)}
              </span>
            </div>
            <div className="ml-[30px] flex flex-row mb-[40px]">
              <p className="font-prompt text-grey-700 text-fontHead5">
                แก้ไขล่าสุด
              </p>
              <span className="ml-[215px] font-prompt text-fontHead4">
                {formatDateTime(categoryData.updated_at)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => showDeleteConfirmationPopup(categoryData.category)}
          className="flex space-x-2 mt-[15px] ml-[1480px]"
        >
          <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(4).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNCkuc3ZnIiwiaWF0IjoxNjk0NzA0NTQ4LCJleHAiOjE3MjYyNDA1NDh9.5uJ9TjNs8ooMo6sf13l87hY6gkNlMUTzdgOsgu4onr0&t=2023-09-14T15%3A15%3A48.928Z" />
          <span className="flex font-prompt text-[#80899C] text-fontHead5 underline">
            ลบหมวดหมู่
          </span>
        </button>
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
              คุณต้องการลบรายการ "{categoryToDelete}" ใช่หรือไม่
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

export default AdminCategoryEdit;
