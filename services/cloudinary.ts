import axios from "axios";

export async function uploadImage(file: File) {

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await axios.post(url, formData);

  return response.data.secure_url;
}