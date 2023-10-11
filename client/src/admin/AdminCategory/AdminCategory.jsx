import Sidebar from "../sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function AdminCategory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
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
      const response = await axios.get("http://localhost:3000/admin/category");
      const data = response.data.data;
      setCategoryData(data);
      setFilteredCategoryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDeleteConfirmationPopup = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteConfirmation = async () => {
    if (categoryToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/admin/category/${categoryToDelete}`
        );
        fetchData();
        setShowDeletePopup(false);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const filterCategories = (query) => {
    if (query.trim() === "") {
      setFilteredCategoryData(categoryData);
    } else {
      setFilteredCategoryData(
        categoryData.filter((category) =>
          category.category.toLowerCase().includes(query.toLowerCase())
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
          <p className="text-fontHead2 font-prompt ml-[50px]">หมวดหมู่</p>
          <div className="space-x-5 mr-[50px]">
            <input
              type="text"
              placeholder="  ค้นหาหมวดหมู่..."
              className="w-[350px] h-[44px] border border-grey-300 font-prompt focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded pl-4"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                filterCategories(e.target.value);
              }}
            />
            <Link to="/admin/category/create">
              <button className="w-[185px] h-[44px] rounded-lg bg-blue-600 hover:bg-blue-700 space-x-2">
                <span className="text-utils-white font-prompt text-fontHead5">
                  เพิ่มหมวดหมู่
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
                <th className="w-[20%] pl-6">ชื่อหมวกหมู่</th>
                <th className="w-[25%] pl-6">สร้างเมื่อ</th>
                <th className="w-[25%] pl-6">แก้ไขล่าสุด</th>
                <th className="w-[10%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategoryData.map((category) => (
                <tr
                  key={category.category_id}
                  className="border border-grey-500 h-[70px] text-body2 font-prompt"
                >
                  <td className="text-center">{category.category_id}</td>
                  <td className="pl-6">{category.category}</td>
                  <td className="pl-6">
                    {formatDateTime(category.created_at)}
                  </td>
                  <td className="pl-6">
                    {formatDateTime(category.updated_at)}
                  </td>
                  <td className="text-center space-x-4">
                    <button
                      onClick={() =>
                        showDeleteConfirmationPopup(category.category_id)
                      }
                    >
                      <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(4).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoNCkuc3ZnIiwiaWF0IjoxNjk0NzA0NTQ4LCJleHAiOjE3MjYyNDA1NDh9.5uJ9TjNs8ooMo6sf13l87hY6gkNlMUTzdgOsgu4onr0&t=2023-09-14T15%3A15%3A48.928Z" />
                    </button>
                    <Link to={`/admin/category/edit/${category.category_id}`}>
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
                categoryData.find(
                  (category) => category.category_id === categoryToDelete
                )?.category
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

export default AdminCategory;
