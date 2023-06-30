import axiosInstance from "../../common/axios";

export const getListMarkers = async () => {
  const { data } = await axiosInstance.get("http://localhost:3030/marker");

  return data;
};
