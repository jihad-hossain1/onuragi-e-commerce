import axios from "axios";

interface UploadImageResponse {
  secure_url: string;
}

const uploadImageToCDN = async (
  image: File,
  uploadPreset: string = "images_preset",
  apiUrl: string = "https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload"
): Promise<string> => {
  try {
    if (!image) {
      throw new Error("No image provided");
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);

    const response = await axios.post<UploadImageResponse>(apiUrl, data);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageToCDN;
