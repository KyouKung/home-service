import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-utils-white flex flex-row justify-evenly items-center h-[160px] ">
        <div className="flex flex-row ">
          <div className="flex flex-row items-center text-fontNav font-Prompt ml-[200px] mr-10 text-blue-600">
            <img
              className="mr-1 w-[32px] h-[32px]"
              src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/house%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2hvdXNlIDEuc3ZnIiwiaWF0IjoxNjk0NzcwOTIwLCJleHAiOjE3MjYzMDY5MjB9.OgUZ8BI-O4Z0EBCe0sLeO95UpgFjAdPjHqFDxZy_Ro8&t=2023-09-15T09%3A42%3A01.422Z"
            ></img>
            HomeServices
          </div>
          <div className="font-Prompt ml-[100px]">
            บริษัท โฮมเซอร์วิสเซส จำกัด
            <br />
            <div className="font-Prompt text-[14px] font-[400] leading-[21px] text-grey-800 mt-3">
              452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10260
            </div>
          </div>
          <div className="ml-[100px]">
            <div className="font-Prompt text-grey-800 text-[16px] font-[400] flex flex-row my-1 ">
              <img
                className="mx-1"
                src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/phone_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3Bob25lX2JsYWNrXzI0ZHAgMS5zdmciLCJpYXQiOjE2OTQ4Njc0NDYsImV4cCI6MTcyNjQwMzQ0Nn0.ph-HkI3aviWFvDDgaycVliCFCntdQ2gC4eUffeK5e3g&t=2023-09-16T12%3A30%3A46.836Z"
              ></img>
              080-540-6357
            </div>
            <div className="font-Prompt text-grey-800 text-[16px] font-[400] flex flex-row my-1">
              <img
                className="mx-1"
                src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/email_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2VtYWlsX2JsYWNrXzI0ZHAgMS5zdmciLCJpYXQiOjE2OTQ4Njc2NzAsImV4cCI6MTcyNjQwMzY3MH0.zApFRr8dwxiTqsroSCUO6Pg-s3pFglyGe64M5555jzU&t=2023-09-16T12%3A34%3A30.534Z"
              ></img>
              contact@homeservices.co
            </div>
          </div>
        </div>
        <div className="w-2"></div>
      </div>
      <div className="bg-grey-100 h-[42px] text-[12px] font-[400] leading-[18px] flex flex-row justify-evenly items-center">
        <div className="text-grey-500">
          copyright © 2021 HomeServices.com All rights reserved
        </div>
        <div className="flex flex-row text-grey-700">
          <p>เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</p>
          <p className="mx-5">นโยบายความเป็นส่วนตัว</p>
        </div>
      </div>
    </>
  );
};
export default Footer;
