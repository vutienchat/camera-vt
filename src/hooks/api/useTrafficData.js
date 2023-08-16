import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../common/axios";
import { QUERY_KEYS } from "../../utils/keys";

const getTrafficData = async (params) => {
  const { data } = await axiosInstance.get("/trafficList");

  return data.map((trafficItem, index) => ({ ...trafficItem, stt: index + 1 }));
};

const useTrafficData = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRAFFIC_LIST, params],
    queryFn: () => getTrafficData(params),
  });
};

export default useTrafficData;
