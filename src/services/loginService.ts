import API from "./api";

export const loginUser = async (data: any) => {
  return await API.post("/login/", data);
};
