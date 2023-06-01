import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../common/axios";

import { QUERY_KEYS } from "../../utils/keys";

const getCustomerDataList = async () => {
  const { data } = await axiosInstance.get("/data");

  return data;
};

const useCustomerDataList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_LIST],
    queryFn: getCustomerDataList,
  });
};

export default useCustomerDataList;
