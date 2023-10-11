import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authentication";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [userValid, setUserValid] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for dropdown
  const navigate = useNavigate();
  const { logout } = useAuth();

  const checkUserLogged = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:3000/auth/${userData.user_id}`
      );
      setUserValid(result.data.data);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUserLogged();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutAndNavigate = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="bg-utils-white flex flex-row justify-evenly items-center h-20 drop-shadow-xl sticky top-0 z-[100]">
        <div className="flex flex-row">
          <div
            className="flex flex-row items-center text-fontNav font-Prompt mr-10 text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="mr-1 w-[32px] h-[32px]"
              src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/house%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2hvdXNlIDEuc3ZnIiwiaWF0IjoxNjk2ODQyMjAzLCJleHAiOjE3MjgzNzgyMDN9.tVXfuG-qw4FUD6-ShcdEVooPKSDhDmHriv-7pZ60ooM&t=2023-10-09T09%3A03%3A24.054Z"
              alt="Home Icon"
            />
            HomeServices
          </div>
          <button
            className="font-Prompt ml-5"
            onClick={() => {
              navigate("/services");
            }}
          >
            บริการของเรา
          </button>
        </div>
        <div className="w-2"></div>
        {isValid ? (
          <div className="relative ">
            <div className="dropdown dropdown-end z-20 ">
              <label
                tabIndex={0}
                className="hover:cursor-pointer flex flex-row"
              >
                <div
                  className="bg-cover bg-center w-12 h-12 rounded-full"
                  style={{
                    backgroundImage: `url("https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/images/anonymous-avatar-icon-25.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvYW5vbnltb3VzLWF2YXRhci1pY29uLTI1LmpwZyIsImlhdCI6MTY5Njg0MjI3MCwiZXhwIjoxNzI4Mzc4MjcwfQ.0kmWSlGfzJnNCnY1q7A9lxfUVUqmdWR21KHPr__DoGw&t=2023-10-09T09%3A04%3A30.439Z")`,
                  }}
                  onClick={toggleDropdown}
                ></div>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className=" absolute top-[65px]  rounded-[5px] z-10 drop-shadow-lg  bg-utils-white w-40 [&_li>*]:rounded-[4px]"
                >
                  <li>
                    <button className="py-2 px-2  w-[100%]" disabled>
                      <span className="text-gray-700 ">ข้อมูลผู้ใช้งาน</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2 px-2 hover:bg-grey-200  w-[100%] "
                      onClick={
                        () => navigate(`/customer`) // Use auth.user
                      }
                    >
                      <span className="text-gray-700">รายการคำสั่งซ่อม</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-2 px-2 hover:bg-grey-200  w-[100%]"
                      // onClick={() => {
                      //   navigate(`/booking/user/${auth.user.id}`); // Use auth.user
                      //   window.location.reload();
                      // }}
                    >
                      <span className="text-gray-700">ประวัติการซ่อม</span>
                    </button>
                  </li>
                  <hr className="mt-2 border-grey-400"></hr>
                  <li>
                    <button
                      className="py-2 px-2 hover:bg-grey-200  w-[100%]"
                      onClick={() => logout()}
                    >
                      <span className="text-gray-700">ออกจากระบบ</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <button
            className="py-[8px] px-[24px] font-Prompt text-blue-600 rounded-md border border-blue-600 bg-utils-white hover:bg-blue-500 hover:text-utils-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            เข้าสู่ระบบ
          </button>
        )}
      </div>
      <div className="bg-utils-black h-[1px] opacity-10"></div>
    </>
  );
};

export default Navbar;
