import axiosInstance from "../../common/axios";

export const getGroupdDataList = async (dataGroup) => {
  const { data } = await axiosInstance.get(`/data`);

  return data;
};

export const getGroupTypesList = async () => {
  const { data } = await axiosInstance.get("/customerType");

  return data;
};
