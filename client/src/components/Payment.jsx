import Navbar from "./Navbar";
import { useService } from "../contexts/services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentPage, setPaymentPage] = useState("");
  const [serviceDetail, setServiceDetail] = useState({});
  const [stepPayment, setStepPayment] = useState(1);

  const service = useService();

  const getService = () => {
    const serviceName = localStorage.getItem("service");
    if (serviceName) {
      const matchingService = service.services.find(
        (service) => service.service_name === serviceName
      );
      if (matchingService) {
        setPaymentPage(servicePayment);
        setServiceDetail(matchingService);
      }
    } else {
      navigate("/");
    }
  };

  //credit card
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [expireDate, setExpireDate] = useState("");

  // total and price
  const [amountService, setAmountService] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // basic info
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [basicAddress, setBasicAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [dateSelection, setDateSelection] = useState(false);
  const [timeSelection, setTimeSelection] = useState(false);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    setTimeSelection(true);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setDateSelection(true);
  };

  useEffect(() => {
    if (service.services === null) {
      navigate("/services");
    } else {
      getService();
    }
  }, [
    basicAddress,
    additionalAddress,
    subDistrict,
    district,
    province,
    selectedDate,
    selectedTime,
    amountService,
    serviceDetail,
    stepPayment,
    cardNumber,
    cardCode,
    expireDate,
  ]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = jwtDecode(token);
      const data = {
        user_id: userData.user_id,
        basicAddress,
        additionalAddress,
        subDistrict,
        district,
        province,
        selectedDate,
        selectedTime,
        serviceDetail: serviceDetail.sub_service[0].name,
        amountService:
          String(amountService) + " " + serviceDetail.sub_service[0].unit,
        totalPrice,
      };
      const result = await axios.post("http://localhost:3000/order", data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const servicePayment = (
    <>
      <div className=" bg-grey-100 z-[-1]  min-h-screen">
        <div
          className={`z-[0] h-[240px] relative w-full flex flex-col justify-center items-center  bg-no-repeat bg-cover bg-center bg-[url('${serviceDetail.service_image}')]`}
        >
          <div className="z-[0] absolute h-[240px] inset-0 bg-blue-950 opacity-60 "></div>
        </div>
        <div className="flex flex-row items-center justify-center my-11">
          <div className="w-full  flex flex-col justify-center items-center relative">
            <div className=" absolute bottom-2  bg-utils-white z-[1] font-Prompt w-[70%] h-[70px] flex flew-row justify-center items-center rounded-md">
              <div className=" absolute bottom-[150px] left-0 bg-utils-white z-[1] font-Prompt w-[300px] h-[70px] flex flew-row justify-center items-center rounded-md">
                <p className="text-grey-700">บริการของเรา</p>
                <p className="mx-5 text-grey-500">{`>`}</p>
                <h1 className="text-blue-600 text-[100%] font-semi-bold">
                  {serviceDetail.service_name}
                </h1>
              </div>
              <div className="flex flex-row justify-between w-[50%]">
                <img
                  className={
                    stepPayment === 1
                      ? "border rounded-full p-1 border-blue-500"
                      : "border rounded-full p-1 border-blue-500 bg-blue-600"
                  }
                  src={
                    stepPayment === 1
                      ? "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Group.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0dyb3VwLnN2ZyIsImlhdCI6MTY5Njc2NDcxMiwiZXhwIjoxNzI4MzAwNzEyfQ.Xcf24GqtosuFq0uv5vtm8kKdHyeGz3Tm38BgGVzt1pw&t=2023-10-08T11%3A31%3A53.372Z"
                      : "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/Group%20(1).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0dyb3VwICgxKS5zdmciLCJpYXQiOjE2OTY3NjQ3NDgsImV4cCI6MTcyODMwMDc0OH0.YC7i8k0AdmEu7EFTfhjCGIuzdFl79tfzIdS3dj-99Vs&t=2023-10-08T11%3A32%3A29.862Z"
                  }
                ></img>
                <img
                  className={
                    stepPayment === 2
                      ? "border rounded-full p-1 border-blue-500"
                      : stepPayment === 3
                      ? "border rounded-full p-1 bg-blue-600 border-blue-500 "
                      : "border rounded-full p-1 border-grey-300"
                  }
                  src={
                    stepPayment === 2
                      ? "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/create_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWF0ZV9ibGFja18yNGRwIDEuc3ZnIiwiaWF0IjoxNjk2NzY0NTA3LCJleHAiOjE3MjgzMDA1MDd9.iSDGPzEamh6eBaksyjcwT_yLFCX4dvjkAFydGSuz57U&t=2023-10-08T11%3A28%3A28.466Z"
                      : stepPayment === 3
                      ? "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/create_black_24dp%201%20(2).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWF0ZV9ibGFja18yNGRwIDEgKDIpLnN2ZyIsImlhdCI6MTY5Njc2NTA4MiwiZXhwIjoxNzI4MzAxMDgyfQ.-jiVASgjVZvGP6GeACW2w62z3UntrfU9jjXo_qB1DW8&t=2023-10-08T11%3A38%3A03.660Z"
                      : "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/create_black_24dp%201%20(1).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWF0ZV9ibGFja18yNGRwIDEgKDEpLnN2ZyIsImlhdCI6MTY5Njc2NDUxOCwiZXhwIjoxNzI4MzAwNTE4fQ.9K6oiYg3YCigwbMHmeSAqqnfQNDXZyIelPWQuuUw-BE&t=2023-10-08T11%3A28%3A39.247Z"
                  }
                ></img>
                <img
                  className={
                    stepPayment === 3
                      ? "border rounded-full p-1 border-blue-500"
                      : "border rounded-full p-1 border-grey-300"
                  }
                  src={
                    stepPayment === 3
                      ? "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/credit_score_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdF9zY29yZV9ibGFja18yNGRwIDEuc3ZnIiwiaWF0IjoxNjk2NzYxMjIzLCJleHAiOjE3MjgyOTcyMjN9.CEEexOTCKcakQ0ncLi8culhOVs3_DoMTqBwZ_sKGiqs&t=2023-10-08T10%3A33%3A44.788Z"
                      : "https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/credit_score_black_24dp%201%20(1).svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdF9zY29yZV9ibGFja18yNGRwIDEgKDEpLnN2ZyIsImlhdCI6MTY5Njc2NDM1MSwiZXhwIjoxNzI4MzAwMzUxfQ.Urn7G37OHf1UAt9mF2ajniBsqYx6ol6z4eQOJkEvuVo&t=2023-10-08T11%3A25%3A52.625Z"
                  }
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen flex flex-row justify-center items-center font-Prompt">
          <div className="w-[70%] flex flex-row justify-between ">
            <div className="bg-utils-white rounded-md w-[60%] p-5 flex flex-col">
              {stepPayment === 1 ? (
                <>
                  <h1 className="mb-5 text-grey-700">
                    เลือกรายการบริการ{serviceDetail.service_name}
                  </h1>
                  <div className="flex flex-col justify-between">
                    {serviceDetail &&
                      serviceDetail.sub_service &&
                      serviceDetail.sub_service.map((subService, index) => (
                        <>
                          <div
                            className=" flex flex-row justify-between"
                            key={index}
                          >
                            <div className="flex flex-col ">
                              <h3 className="text-[18px]">{subService.name}</h3>
                              <p className="text-[14px] text-grey-700">
                                {Number(subService.cost).toLocaleString(
                                  "th-TH",
                                  {
                                    style: "currency",
                                    currency: "THB",
                                  }
                                )}{" "}
                                / {subService.unit}
                              </p>
                            </div>
                            <div>
                              <button
                                className="border border-blue-600 w-[43px] h-[43px] rounded-md mr-5 text-[20px] text-blue-600"
                                onClick={() => {
                                  setAmountService((prev) => {
                                    if (prev <= 0) {
                                      return 0;
                                    } else {
                                      return prev - 1;
                                    }
                                  });
                                  setTotalPrice((prev) => {
                                    if (prev <= 0) {
                                      return 0;
                                    } else {
                                      return prev - Number(subService.cost);
                                    }
                                  });
                                }}
                              >
                                -
                              </button>
                              {amountService}
                              <button
                                className="border border-blue-600 w-[43px] h-[43px] rounded-md mr-5 text-[20px] text-blue-600 ml-5"
                                onClick={() => {
                                  setAmountService((prev) => {
                                    return prev + 1;
                                  });
                                  setTotalPrice((prev) => {
                                    return prev + Number(subService.cost);
                                  });
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <hr className="text-grey-400 my-5"></hr>
                        </>
                      ))}
                  </div>
                </>
              ) : stepPayment === 3 ? (
                <>
                  <h1 className="mb-5 text-grey-700">ชำระเงิน</h1>

                  <form>
                    <div className="flex flex-row justify-evenly">
                      <div className="border border-grey-500 w-[331px] flex flex-col justify-center items-center rounded-md py-3 ">
                        <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/qr_code_2_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3FyX2NvZGVfMl9ibGFja18yNGRwIDEuc3ZnIiwiaWF0IjoxNjk2NzY4MzI5LCJleHAiOjE3MjgzMDQzMjl9.UKfWHVsaBtAONyZ76awMVMPLGHCpljt7JOAkqC3blGU&t=2023-10-08T12%3A32%3A11.151Z"></img>
                        <p>พร้อมเพย์</p>
                      </div>
                      <div className="border border-blue-500 text-blue-700 w-[331px] flex flex-col justify-center items-center rounded-md bg-blue-200">
                        <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/payment_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3BheW1lbnRfYmxhY2tfMjRkcCAxLnN2ZyIsImlhdCI6MTY5Njc2ODA4OSwiZXhwIjoxNzI4MzA0MDg5fQ.iiRKltKck9hIpDn5A7V7v7Fq0fbYKuZRMTzQ-UN3mkY&t=2023-10-08T12%3A28%3A11.105Z"></img>
                        <p>บัตรเครดิต</p>
                      </div>
                    </div>

                    <div className=" py-5">
                      <label htmlFor="cardNumber">
                        <p className="font-body1 text-gray-900 mb-[4px]">
                          หมายเลขบัตรเครดิต*
                        </p>
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        value={cardNumber}
                        pattern="(\d{4} ?){4}"
                        onChange={(e) => {
                          const cleanedValue = e.target.value.replace(
                            /[^\d]/g,
                            ""
                          );

                          const formattedValue = cleanedValue
                            .replace(/(\d{4})/g, "$1 ")
                            .trim();
                          setCardNumber(formattedValue);
                        }}
                        name="card_number"
                        maxLength={19}
                        placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
                        className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                      />
                    </div>
                    <div className=" py-5">
                      <label htmlFor="cardOwner">
                        <p className="font-body1 text-gray-900 mb-[4px]">
                          ชื่อบนบัตร*
                        </p>
                      </label>
                      <input
                        id="cardOwner"
                        type="text"
                        name="card_owner"
                        placeholder="กรุณากรอกชื่อบนบัตร"
                        className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-10 py-5">
                      <div>
                        <label htmlFor="expire_date">
                          <p className="font-body1 text-gray-900 mb-[4px]">
                            วันหมดอายุ*
                          </p>
                        </label>
                        <input
                          id="expire_date"
                          type="tel"
                          name="expire_date"
                          value={expireDate}
                          onChange={(e) => {
                            const cleanedValue = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            const formattedValue = cleanedValue.replace(
                              /^(\d{2})(\d{0,2})/,
                              (_, month, year) => {
                                const maxMonth = month > 12 ? "12" : month;
                                return `${maxMonth}${year ? "/" : ""}${year}`;
                              }
                            );
                            setExpireDate(formattedValue);
                          }}
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                        />
                      </div>

                      <div>
                        <label htmlFor="cvc">
                          <p className="font-body1 text-gray-900 mb-[4px]">
                            รหัส CVC / CVV
                          </p>
                        </label>
                        <input
                          id="cvc"
                          type="tel"
                          name="cvc"
                          placeholder="cvc/cvv"
                          value={cardCode}
                          onChange={(e) => {
                            setCardCode(e.target.value);
                          }}
                          pattern="\d*"
                          maxLength={3}
                          className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                        />
                      </div>
                    </div>
                  </form>
                </>
              ) : stepPayment === 2 ? (
                <>
                  <h1 className="mb-5 text-grey-700">กรอกข้อมูลบริการ</h1>
                  <div className="flex flex-row justify-between">
                    <form className="w-full">
                      <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                        <div className="relative">
                          <label htmlFor="address">
                            <p className="font-Prompt text-gray-900 text-start mb-1">
                              วันที่สะดวกใช้บริการ *
                            </p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              slotProps={{ textField: { size: "small" } }}
                              sx={{
                                width: "100%",
                                fontFamily: "Arial, sans-serif",
                              }}
                              value={selectedDate}
                              onChange={handleDateChange}
                            />
                          </LocalizationProvider>
                        </div>

                        <div className="relative">
                          <label htmlFor="address">
                            <p className="font-Prompt text-gray-900 text-start mb-1">
                              เวลาที่สะดวกใช้บริการ *
                            </p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="เวลาที่สะดวกใช้บริการ"
                              slotProps={{ textField: { size: "small" } }}
                              sx={{
                                width: "100%",
                              }}
                              ampm={false}
                              value={selectedTime}
                              onChange={handleTimeChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                        <div className="relative">
                          <label htmlFor="address">
                            <p className="font-Prompt text-gray-900 text-start">
                              ที่อยู่ *
                            </p>
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={basicAddress}
                            onChange={(e) => {
                              setBasicAddress(e.target.value);
                            }}
                            placeholder="กรุณากรอกที่อยู่"
                            className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                            required
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="sub-district">
                            <p className="font-body1 text-gray-900 text-start">
                              แขวง / ตำบล *
                            </p>
                          </label>
                          <select
                            name="sub-district"
                            id="sub-district"
                            className={`text-grey-900  p-2 w-full rounded-md border border-grey-500 focus:outline-none`}
                            onChange={(e) => {
                              setSubDistrict(e.target.value);
                            }}
                          >
                            <option selected disabled>
                              เลือกแขวง / ตำบล
                            </option>
                            <option value={subDistrict}>เสนานิคม</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                        <div className="relative">
                          <label htmlFor="bedType">
                            <p className="font-body1 text-gray-900 text-start">
                              เขตอำเภอ *
                            </p>
                          </label>
                          <select
                            name="district"
                            id="district"
                            className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                            onChange={(e) => {
                              setDistrict(e.target.value);
                            }}
                          >
                            <option selected disabled>
                              เลือกเขต / อำเภอ
                            </option>
                            <option value={district}>จตุจักร</option>
                          </select>
                        </div>

                        <div className="relative">
                          <label htmlFor="bedType">
                            <p className="font-Prompt text-gray-900 text-start">
                              จังหวัด *
                            </p>
                          </label>
                          <select
                            name="province"
                            id="province"
                            className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                            onChange={(e) => {
                              setProvince(e.target.value);
                            }}
                          >
                            <option selected disabled>
                              เลือกจังหวัด
                            </option>
                            <option value={province}>กรุงเทพฯ</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="additionRequest">
                          <p className="font-Prompt text-gray-900 text-start">
                            ระบุข้อมูลเพิ่มเติม
                          </p>
                        </label>
                        <textarea
                          name="additionRequest"
                          value={additionalAddress}
                          onChange={(e) => {
                            setAdditionalAddress(e.target.value);
                          }}
                          id="additionRequest"
                          placeholder="กรุณาระบบข้อมูลเพิ่มเติม"
                          className={`text-grey-900 w-full p-2 rounded-md border border-grey-500 focus:outline-none`}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </>
              ) : null}
            </div>
            <div className="bg-utils-white rounded-md w-[35%] h-[100%] flex flex-col p-5 font-Prompt mr-3">
              <p className="text-grey-700">สรุปรายการ</p>
              <div className=" flex flex-row justify-between items-center mt-3">
                <div>
                  {serviceDetail &&
                  serviceDetail.sub_service &&
                  serviceDetail.sub_service[0]
                    ? serviceDetail.sub_service[0].name
                    : "No service name available"}
                </div>
                <div>{amountService} รายการ</div>
              </div>
              <hr className="text-grey-400 my-5" />
              {stepPayment === 3 ? (
                <>
                  <div className="flex flex-col w-[100%]">
                    <div className="flex flex-row justify-between">
                      <p className="text-grey-700">วันที่</p>
                      {selectedDate
                        ? selectedDate.format("DD/MM/YYYY")
                        : "กรุณาเลือกวันที่"}
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-grey-700">เวลา</p>
                      {selectedTime
                        ? selectedTime.format("HH:mm") + " น."
                        : "กรุณาเลือกเวลา"}
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-grey-700">สถานที่</p>
                      <div className="w-[50%] flex flex-row justify-end text-right">
                        {basicAddress && subDistrict && district && province ? (
                          <>
                            {basicAddress} {subDistrict} {district} {province}
                          </>
                        ) : (
                          "กรุณากรอกที่อยู่ให้ครบ"
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className="text-grey-400 my-5" />
                </>
              ) : null}

              <div className=" flex flex-row justify-between items-center">
                <div>รวม</div>
                <div>
                  {totalPrice.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-[100%] bg-utils-white h-[92px] flex justify-center">
        <div className="w-[70%] flex flex-row justify-between items-center">
          <button
            className="border border-blue-500 rounded-md h-[44px] w-[144px] font-Prompt text-blue-600"
            onClick={() =>
              setStepPayment((prev) => {
                if (prev > 1) {
                  return prev - 1;
                } else {
                  navigate("/services");
                }
              })
            }
          >
            ย้อนกลับ
          </button>
          {stepPayment <= 2 ? (
            <button
              className="border border-blue-500 bg-blue-600 rounded-md h-[44px] w-[144px] font-Prompt text-utils-white"
              onClick={() =>
                setStepPayment((prev) => {
                  if (prev < 3) {
                    return prev + 1;
                  } else {
                    return;
                  }
                })
              }
            >
              ดำเนินการต่อ
            </button>
          ) : (
            <button
              className={`border border-blue-500 rounded-md h-[44px] w-[144px] font-Prompt text-utils-white ${
                totalPrice <= 0 ||
                (!basicAddress && !subDistrict && !district && !province) ||
                !dateSelection ||
                !timeSelection
                  ? "bg-grey-300 border-grey-300"
                  : "bg-blue-600"
              }`}
              disabled={
                totalPrice <= 0 ||
                (!basicAddress && !subDistrict && !district && !province) ||
                !dateSelection ||
                !timeSelection
              }
              onClick={handlePayment}
            >
              ยืนยันการชำระเงิน
            </button>
          )}
        </div>
      </div>
    </>
  );
  const initialPage = <>Initial</>;

  return (
    <div>
      <Navbar />
      {paymentPage}
    </div>
  );
};

export default Payment;
