import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  let buttonColor = "hover:bg-blue-900";
  let buttonColor2 = "hover:bg-blue-900";

  if (
    location.pathname === "/admin/category" ||
    location.pathname === "/admin/category/create" ||
    location.pathname.startsWith("/admin/category/edit/")
  ) {
    buttonColor = "bg-blue-900";
  }

  if (
    location.pathname === "/admin/service" ||
    location.pathname === "/admin/service/create" ||
    location.pathname.startsWith("/admin/service/edit/") ||
    location.pathname.startsWith("/admin/service/detail/")
  ) {
    buttonColor2 = "bg-blue-900";
  }

  return (
    <div className="w-[240px] bg-blue-950 flex flex-col justify-between">
      <div className="flex flex-col justify-start items-center">
        <div className="w-[192px] h-[46px] bg-blue-100 flex flex-row items-center justify-center rounded-xl space-x-2 mt-[30px]">
          <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/house%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2hvdXNlIDEuc3ZnIiwiaWF0IjoxNjk0NjgxNjY2LCJleHAiOjE3MjYyMTc2NjZ9.Gt9LAsLUguvcVCzT8LvFeA6V8abFNw-RfL0tISeMEjI&t=2023-09-14T08%3A54%3A06.996Z" />
          <p className="text-fontHead2 text-blue-500 font-prompt">
            HomeServices
          </p>
        </div>
        <div className="mt-[50px]">
          <Link to="/admin/category">
            <button
              className={`w-[240px] h-[50px] hover:bg-blue-900 ${buttonColor}`}
            >
              <div className="ml-[25px] flex flex-row items-center justify-start space-x-5">
                <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3Rvci5zdmciLCJpYXQiOjE2OTQ2ODI3ODcsImV4cCI6MTcyNjIxODc4N30.bApf6E9z8tvglUcaLNewq1dssLYH9QcDnPegDQFEkVM&t=2023-09-14T09%3A12%3A47.644Z" />
                <p className="text-fontHead5 text-utils-white font-prompt">
                  หมวดหมู่
                </p>
              </div>
            </button>
          </Link>
          <Link to="/admin/service">
            <button
              className={`w-[240px] h-[50px] hover:bg-blue-900 ${buttonColor2}`}
            >
              <div className="ml-[25px] flex flex-row items-center justify-start space-x-5">
                <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(1).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoMSkuc3ZnIiwiaWF0IjoxNjk0NjgzMzMyLCJleHAiOjE3MjYyMTkzMzJ9.l4J-OVov7VdIDAnEXT7InuO8MqGHEGGwtfNtj-8_dUM&t=2023-09-14T09%3A21%3A53.302Z" />
                <p className="text-fontHead5 text-utils-white font-prompt">
                  บริการ
                </p>
              </div>
            </button>
          </Link>
          <button className="w-[240px] h-[50px] hover:bg-blue-900">
            <div className="ml-[25px] flex flex-row items-center justify-start space-x-5">
              <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(2).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoMikuc3ZnIiwiaWF0IjoxNjk0NjgzMzIwLCJleHAiOjE3MjYyMTkzMjB9.pQAiHYdc3JqM_Nmf3TL7AfVnV8yQZ_vq4KU5nGWKhik&t=2023-09-14T09%3A21%3A40.732Z" />
              <p className="text-fontHead5 text-utils-white font-prompt">
                Promotion Code
              </p>
            </div>
          </button>
        </div>
      </div>

      <button className="w-[240px] h-[50px] mb-[60px] hover:bg-blue-900">
        <div className="ml-[25px] flex flex-row items-center justify-start space-x-5">
          <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Vector%20(3).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1ZlY3RvciAoMykuc3ZnIiwiaWF0IjoxNjk0NjgzNDYxLCJleHAiOjE3MjYyMTk0NjF9.MI0O1n-NkezqHl6DJC0fOi7av8ptReGc9-06qTK5k9M&t=2023-09-14T09%3A24%3A01.985Z" />
          <p className="text-fontHead5 text-utils-white font-prompt">
            ออกจากระบบ
          </p>
        </div>
      </button>
    </div>
  );
}

export default Sidebar;
