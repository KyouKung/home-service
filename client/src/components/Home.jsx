import ServiceCard from "./services/ServiceCard";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-blue-100 w-full h-[540px] flex flex-col justify-center pl-[20%] bg-no-repeat  bg-[right_200px_bottom] bg-[url('https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/images/plumber-pointing-lateral_1368-587-removebg-preview%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvcGx1bWJlci1wb2ludGluZy1sYXRlcmFsXzEzNjgtNTg3LXJlbW92ZWJnLXByZXZpZXcgMS5wbmciLCJpYXQiOjE2OTQ4NDM0MzUsImV4cCI6MTcyNjM3OTQzNX0.PQGJh_WePk-VuR6Jd_NQir5IhvoXRJmHwQNuFXsll9I&t=2023-09-16T05%3A50%3A36.932Z')]">
        <h1 className="text-[64px] font-[700] font-Prompt text-blue-700 leading-[96px]">
          เรื่องบ้าน...ให้เราช่วยดูแลคุณ
        </h1>
        <h3 className="text-[42px] font-[600] font-Prompt leading-normal text-utils-black">
          "สะดวก ราคาคุ้มค่า เชื่อถือได้"
        </h3>
        <p className="text-[24px] font-[400] font-Prompt leading-normal text-grey-700 mt-6">
          ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน <br /> โดยพนักงานแม่บ้าน
          และช่างมืออาชีพ
        </p>
        <button
          onClick={() => {
            navigate("/services");
          }}
          className="text-[20px] font-[500] font-Prompt leading-[20px] text-utils-white bg-blue-600 py-[12px] px-[32px] rounded-[8px] w-[191px] mt-8 hover:drop-shadow-md"
        >
          <p className="py-[5px]">เช็คราคาบริการ</p>
        </button>
      </div>
      <div className=" w-full h-[790px] bg-grey-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center ">
          <h2 className="font-Prompt font-[500] text-[32px] leading-[48px] text-blue-950 mb-5">
            บริการยอดฮิตของเรา
          </h2>
          <div className="my-5">
            <ServiceCard number={3}></ServiceCard>
          </div>
          <button
            onClick={() => {
              navigate("/services");
            }}
            className="text-[16px] font-[500] font-Prompt leading-[24px] text-utils-white bg-blue-600 py-[1จpx] px-[24px] rounded-[8px] w-[155px] mt-8 hover:drop-shadow-md"
          >
            <p className="py-[10px]">ดูบริการทั้งหมด</p>
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div
          className="h-[378px] w-[900px] bg-blue-600 bg-no-repeat flex flex-row justify-center items-center"
          style={{
            backgroundImage: `url('https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/images/part-male-construction-worker_329181-3734%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvcGFydC1tYWxlLWNvbnN0cnVjdGlvbi13b3JrZXJfMzI5MTgxLTM3MzQgMS5wbmciLCJpYXQiOjE2OTQ4NjM1MjMsImV4cCI6MTcyNjM5OTUyM30.LXAWxq-bx4qd6O7J7LHLophHCNjaI9HBSIxKeNIZLOE&t=2023-09-16T11%3A25%3A23.752Z')`,
          }}
        ></div>
        <div
          className="relative h-[378px] w-[100%] bg-blue-600 flex flex-col justify-center pl-[100px] bg-[length:416px_416px] bg-no-repeat overflow-hidden bg-[right_100px_bottom_-50px] mix-blend-screen"
          style={{
            backgroundImage: `url('https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/images/f0733b5ff94a23b59fd5fccba21d7d98.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvZjA3MzNiNWZmOTRhMjNiNTlmZDVmY2NiYTIxZDdkOTgucG5nIiwiaWF0IjoxNjk0ODY1OTgzLCJleHAiOjE3MjY0MDE5ODN9.LDNFrq1WTY9X3cik2FMAHYDGl651dq5xf-sF3p4NXEU&t=2023-09-16T12%3A06%3A23.801Z')`,
          }}
        >
          <h2 className="font-Prompt text-[40px] font-[600] leading-[50px] text-utils-white">
            มาร่วมเป็นพนักงานซ่อม
            <br />
            กับ HomeServices
          </h2>
          <p className="font-Prompt text-[20px] font-[400] leading-[30px] my-5 text-utils-white">
            เข้ารักการฝึกอบรมมาตรฐาน ฟรี!
            <br />
            และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม
          </p>
          <h3 className="font-Prompt text-[32px] font-[500] leading-[48px] text-utils-white">
            ติดต่อมาที่อีเมล: job@homeservices.com
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
