import { Router } from "express";
import { supabase } from "../utils/db.js";

export const orderRouter = Router();

orderRouter.get("/", async (req, res) => {
  let { data: order, error } = await supabase.from("order_service").select("*");

  if (!order) {
    return res.json({
      message: "No data",
    });
  }
  return res.json({
    data: order,
  });
});

orderRouter.get("/:userId", async (req, res) => {
  const user_id = req.params.userId;
  let { data: order, error } = await supabase
    .from("order_service")
    .select("*")
    .eq("user_id", user_id);

  if (!order) {
    return res.json({
      message: "No data",
    });
  }
  return res.json({
    data: order,
  });
});

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
orderRouter.post("/", async (req, res) => {
  const {
    user_id,
    basicAddress,
    additionalAddress,
    subDistrict,
    district,
    province,
    selectedDate,
    selectedTime,
    serviceDetail,
    amountService,
    totalPrice,
  } = req.body;

  const date = new Date(selectedDate);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  // Format the service_time as "HH:mm"
  const time = new Date(selectedTime);
  const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const orderCode = `AD${generateRandomString(8)}`;

  const newData = {
    user_id: user_id,
    order_code_id: orderCode,
    created_at: new Date(),
    address: basicAddress + " " + subDistrict + " " + district + " " + province,
    service_date: formattedDate,
    service_time: formattedTime,
    service_list: serviceDetail + " " + String(amountService),
    total_price: String(totalPrice),
    order_status: "รอดำเนินการ",
  };

  if (newData) {
    const { data, error } = await supabase
      .from("order_service")
      .insert(newData);
  }
  console.log(newData);
  return res.json({
    data: newData,
  });
});
