import React, { useState, createContext } from "react";
import { Box } from "@material-ui/core";

import HeaderFilter from "./Filter/HeaderFilter";
import TableFilter from "./Filter/TableFilter";
import TabStatusTable from "./Table/TabStatusTable";
import useTrafficData from "../../hooks/api/useTrafficData";
import TableContent from "./Table/TableContent";
import { columnsTrafficData } from "../../utils/traffic";

export const TrafficContext = createContext({});

const TrafficContent = () => {
  const {
    data: trafficList,
    isLoading: isTrafficLoading,
    isFetching: isTrafficFetching,
  } = useTrafficData();

  const [checkedItemList, setCheckedItemList] = useState([]);
  const [paramTrafficSearch, setParamTrafficSearch] = useState({
    status: [],
    errors: [],
    vehicles: [],
    carColor: [],
    plateCarColor: [],
    endDate: "",
    startDate: "",
    tabPane: "all",
  });

  const handleCheckData = (data) => {
    setCheckedItemList(data);
  };

  const data = {
    trafficList,
    checkedItemList,
    paramTrafficSearch,
    setParamTrafficSearch,
  };

  return (
    <TrafficContext.Provider value={data}>
      <Box>
        <HeaderFilter />
        <TableFilter />
        <Box mt={3}>
          <TabStatusTable />
          <TableContent
            isLoading={isTrafficLoading || isTrafficFetching}
            tableData={trafficList}
            tableHeader={columnsTrafficData}
            handleCheckData={handleCheckData}
          />
        </Box>
      </Box>
    </TrafficContext.Provider>
  );
};

export default TrafficContent;
