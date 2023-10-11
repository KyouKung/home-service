import { useService } from "../../contexts/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ServiceCard = (props) => {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState(null);
  const service = useService();

  useEffect(() => {
    setServicesList(service.services);
  }, [service]);

  const [selectService, setSelectService] = useState("");

  const handleSelectService = (name) => {
    setSelectService(name);
    localStorage.setItem("service", name);
    navigate("/payment");
  };

  let displayedServices = [];

  if (props.number) {
    displayedServices = servicesList ? servicesList.slice(0, props.number) : [];
  } else {
    // Filter servicesList based on the sort prop
    if (props.sort === "ascending") {
      displayedServices = servicesList ? [...servicesList].sort() : [];
    } else if (props.sort === "general") {
      displayedServices = servicesList
        ? servicesList.filter(
            (service) => service.category_service.category_id === 1
          )
        : [];
    } else if (props.sort === "kitchen") {
      displayedServices = servicesList
        ? servicesList.filter(
            (service) => service.category_service.category_id === 2
          )
        : [];
    } else if (props.sort === "bathroom") {
      displayedServices = servicesList
        ? servicesList.filter(
            (service) => service.category_service.category_id === 3
          )
        : [];
    } else if (props.sort === "bedroom") {
      displayedServices = servicesList
        ? servicesList.filter(
            (service) => service.category_service.category_id === 4
          )
        : [];
    } else if (props.sort === "sort-price-low") {
      displayedServices = servicesList
        ? [...servicesList].sort((a, b) => a.price - b.price)
        : [];
    } else if (props.sort === "sort-price-high") {
      displayedServices = servicesList
        ? [...servicesList].sort((a, b) => b.price - a.price)
        : [];
    } else {
      displayedServices = servicesList || [];
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {displayedServices.map((name, index) => {
        return (
          <div
            key={index}
            className="h-[370px] w-[350px] bg-utils-white mx-5 rounded-[8px] bg-no-repeat bg-contain mt-6 "
            style={{
              backgroundImage: `url(${name.service_image})`,
            }}
          >
            <div className="h-[200px]"></div>
            <div className="ml-5 mt-5 ">
              {name.category_service.category === "บริการทั่วไป" ? (
                <div className="font-Prompt text-blue-800 text-[12px] font-[400px] leading-[18px] bg-blue-100 py-[4px] px-[10px] w-[100px] rounded-lg text-center">
                  {name.category_service.category}
                </div>
              ) : name.category_service.category === "บริการห้องครัว" ? (
                <div className="font-Prompt text-purple-900 text-[12px] font-[400px] leading-[18px] bg-purple-100 py-[4px] px-[10px] w-[100px] rounded-lg text-center">
                  {name.category_service.category}
                </div>
              ) : name.category_service.category === "บริการห้องน้ำ" ? (
                <div className="font-Prompt text-green-900 text-[12px] font-[400px] leading-[18px] bg-green-100 py-[4px] px-[10px] w-[100px] rounded-lg text-center">
                  {name.category_service.category}
                </div>
              ) : null}

              <div className="font-Prompt text-[20px] font-[500] leading-[30px] text-grey-950 my-1">
                {name.service_name}
              </div>
              <div className="flex flex-row items-center">
                <img src="https://kpxesshawklisjhmjqai.supabase.co/storage/v1/object/sign/dev-storage/icon/sell_black_24dp%201.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3NlbGxfYmxhY2tfMjRkcCAxLnN2ZyIsImlhdCI6MTY5NDg2MTI2NiwiZXhwIjoxNzI2Mzk3MjY2fQ.Z66mFTPf1zOc3Hh5KHWDBFphrEvXb8qPljt6qnyU9b0&t=2023-09-16T10%3A47%3A46.537Z"></img>
                <p className="ml-1 font-Prompt text-grey-700 text-[14px] font-[400] leading-[21px] my-1">
                  ค่าบริการประมาณ
                </p>
                <p className="ml-1 font-Prompt text-grey-700 text-[14px] font-[400] leading-[21px] my-1">
                  {name &&
                    name.sub_service &&
                    name.sub_service[0] &&
                    Number(name.sub_service[0].cost).toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                </p>
              </div>
              <div
                className="font-Prompt underline text-blue-600 pt-3 cursor-pointer"
                onClick={() => handleSelectService(name.service_name)}
              >
                เลือกบริการ
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCard;
