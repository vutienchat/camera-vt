import { useQuery } from "@tanstack/react-query";

import { getCustomerDataList } from "../../utils/api/group";
import { QUERY_KEYS } from "../../utils/keys";

const useGroupDataList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_LIST],
    queryFn: getCustomerDataList,
  });
};

export default useGroupDataList;
