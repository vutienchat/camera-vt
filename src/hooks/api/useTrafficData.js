import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../common/axios";
import { QUERY_KEYS } from "../../utils/keys";

const getTrafficData = async () => {
  const { data } = await axiosInstance.get("/trafficList");

  return data;
};

const useTrafficData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRAFFIC_LIST],
    queryFn: () => getTrafficData(),
  });
};

export default useTrafficData;
