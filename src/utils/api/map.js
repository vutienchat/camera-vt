import axiosInstance from "../../common/axios";

export const getListMarkers = async () => {
  const { data } = await axiosInstance.get("http://localhost:3030/nodeList");

  return data;
};

export const editMarker = async (param) => {
  const { data } = await axiosInstance.patch(
    "http://localhost:3030/nodeList/37012e00e59711ed879f024263d4df88",
    param
  );

  return data;
};
