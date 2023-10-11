import { supabase } from "./db.js";
import { v4 as uuidv4 } from "uuid";

const supabaseUpload = async (files) => {
  let fileUrls = "";

  for (let file of files.service_image) {
    try {
      const { data, error } = await supabase.storage
        .from("user-storage")
        .upload("service_image/" + `service_${uuidv4()}`, file.buffer, {
          contentType: file.mimetype,
        });
      if (error) {
        console.error("Error uploading file:", error);
        continue;
      }

      const fileUrl = supabase.storage
        .from("user-storage")
        .getPublicUrl(data.path);

      fileUrls = fileUrl.data.publicUrl;
    } catch (error) {
      console.error("Error processing file:", error);
    }
  }
  return fileUrls;
};

export { supabaseUpload };
