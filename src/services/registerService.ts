import API from "./api";

export const registerUser = async (data: any) => {
  return await API.post("/api/register/", data);  
};
