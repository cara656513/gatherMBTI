import supabase from "../supabase";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (input) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(input.img.name + uuidv4(), input.img);

  if (error) {
    console.log(error);
    throw error;
  }

  const { data: imgdata } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  return imgdata.publicUrl;
};
