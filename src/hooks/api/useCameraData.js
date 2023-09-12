import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../common/axios";
import { QUERY_KEYS } from "../../utils/keys";

const getCameraData = async (params) => {
  const { data } = await axiosInstance.get("/cameraList");
  return data;
};
const useCameraData = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CAMERA_LIST, params],
    queryFn: () => getCameraData(params),
  });
};

export default useCameraData;
