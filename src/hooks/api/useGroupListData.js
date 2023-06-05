import { useQuery } from "@tanstack/react-query";

import { getGroupdDataList } from "../../utils/api/group";
import { QUERY_KEYS } from "../../utils/keys";

const useGroupDataList = (dataGroupTable) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_LIST, dataGroupTable],
    queryFn: () => getGroupdDataList(dataGroupTable),
    staleTime: 2 * 60 * 1000,
  });
};

export default useGroupDataList;
