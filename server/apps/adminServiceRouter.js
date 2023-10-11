import { supabase } from "../utils/db.js";
import { Router } from "express";
import { supabaseUpload } from "../utils/upload.js";
import multer from "multer";

export const adminServiceRouter = Router();

const multerUpload = multer({ storage: multer.memoryStorage() });
const avatarUpload = multerUpload.fields([{ name: "service_image" }]);

adminServiceRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("service")
      .select("*, category_service(*)")
      .order("service_id", { ascending: true });

    if (error) {
      console.error("Error fetching service:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching service." });
    }

    res.json({ data });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminServiceRouter.get("/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { data, error } = await supabase
      .from("service")
      .select("*, category_service(*)")
      .eq("service_id", serviceId)
      .single();

    if (error) {
      console.error("Error fetching service:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching service." });
    }

    res.json({ data });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminServiceRouter.post("/", avatarUpload, async (req, res) => {
  let serviceImage = null;

  if (req.files && req.files.service_image) {
    serviceImage = await supabaseUpload(req.files);
  }

  try {
    const { serviceName, category, subService } = req.body;

    const filteredSubService = subService.filter(
      (item) => item.cost !== "" || item.name !== "" || item.unit !== ""
    );

    const newService = {
      service_name: serviceName,
      category_id: category,
      sub_service: filteredSubService,
      service_image: serviceImage,
      created_at: new Date(),
    };

    const { error } = await supabase.from("service").insert(newService);

    if (error) {
      console.error("Error creating service:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating service." });
    }

    res.status(201).json({ message: "admin has been created successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminServiceRouter.put("/:id", avatarUpload, async (req, res) => {
  let serviceImage;

  if (req.files && req.files.service_image) {
    serviceImage = await supabaseUpload(req.files);
  } else {
    serviceImage;
  }

  try {
    const serviceId = req.params.id;
    const { serviceName, category, subService } = req.body;

    const filteredSubService = subService.filter(
      (item) => item.cost !== "" || item.name !== "" || item.unit !== ""
    );

    const updateService = {
      service_name: serviceName,
      category_id: category,
      sub_service: filteredSubService,
      service_image: serviceImage,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("service")
      .update(updateService)
      .eq("service_id", serviceId);

    if (error) {
      console.error("Error updating service:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating service." });
    }

    res.status(201).json({ message: "admin has been updated successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminServiceRouter.delete("/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { error } = await supabase
      .from("service")
      .delete()
      .eq("service_id", serviceId);

    if (error) {
      console.error("Error deleting service:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting service." });
    }

    res.status(201).json({ message: "admin has been delete successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});
