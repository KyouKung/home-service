import { supabase } from "../utils/db.js";
import { Router } from "express";
export const adminCategoryRouter = Router();

adminCategoryRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("category_service")
      .select("*")
      .order("category_id", { ascending: true });

    if (error) {
      console.error("Error fetching category:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching category." });
    }

    res.json({ data });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminCategoryRouter.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { data, error } = await supabase
      .from("category_service")
      .select("*")
      .eq("category_id", categoryId)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching category." });
    }

    res.json({ data });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminCategoryRouter.post("/", async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = {
      category,
      created_at: new Date(),
    };

    if (!category) {
      return res.status(400).json({
        error: "Please enter category.",
      });
    }

    const { error } = await supabase
      .from("category_service")
      .insert(newCategory);

    if (error) {
      console.error("Error creating category:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating category." });
    }

    res.status(201).json({ message: "admin has been created successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminCategoryRouter.put("/:id", async (req, res) => {
  try {
    const categoryID = req.params.id;
    const { category } = req.body;

    const updateCategory = {
      category,
      updated_at: new Date(),
    };

    if (!category) {
      return res.status(400).json({
        error: "Please enter category.",
      });
    }

    const { error } = await supabase
      .from("category_service")
      .update(updateCategory)
      .eq("category_id", categoryID);

    if (error) {
      console.error("Error updating category:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating category." });
    }

    res.status(201).json({ message: "admin has been updated successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

adminCategoryRouter.delete("/:id", async (req, res) => {
  try {
    const categoryID = req.params.id;

    const { error } = await supabase
      .from("category_service")
      .delete()
      .eq("category_id", categoryID);

    if (error) {
      console.error("Error deleting category:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting category." });
    }

    res.status(201).json({ message: "admin has been delete successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});
