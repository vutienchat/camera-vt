import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../utils/keys";
import { getListMarkers } from "../../utils/api/map";

const useListMarkersData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKERS_LIST],
    queryFn: getListMarkers,
  });
};

export default useListMarkersData;
