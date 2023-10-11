import { Router } from "express";
import { supabase } from "../utils/db.js";

export const serviceRouter = Router();

serviceRouter.get("/", async (req, res) => {
  let { data: service, error } = await supabase
    .from("service")
    .select("*")
    .order("service_used", { ascending: false });
  if (!service) {
    return res.json({
      message: "No data",
    });
  }
  return res.json({
    data: service,
  });
});
