import axiosInstance from "../../common/axios";

export const getCustomerDataList = async () => {
  const { data } = await axiosInstance.get("/data");

  return data;
};
