import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../utils/keys";
import { getGroupTypesList } from "../../utils/api/group";

const useGroupTypesList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_TYPES_LIST],
    queryFn: getGroupTypesList,
  });
};

export default useGroupTypesList;
