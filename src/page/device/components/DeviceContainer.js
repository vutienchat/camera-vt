import React, { useContext, useMemo } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import FilterBar from "./FilterTable";
import TableContent from "../Table/TableContent";
import { TableHeader, tableData } from "../utils";
import { DeviceContext } from "./DeviceProvider";

const DeviceContainer = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const handleCheckData = (data) => {
    console.log("data", data);
  };
  const dataListShow = useMemo(() => {
    if (!tableData) return [];
    const trafficData = tableData.map((trafficItem, index) => ({
      ...trafficItem,
      stt: index + 1,
    }));
    return {
      length: trafficData.length,
      data: trafficData.slice(
        state.pagination.page * state.pagination.rowPerPage,
        state.pagination.page * state.pagination.rowPerPage +
          state.pagination.rowPerPage
      ),
    };
  }, [tableData, state.pagination]);

  const handleChangePagination = (pag) => {
    dispatch({
      type: "PAGINATION",
      pagination: {
        page: pag.page,
        rowPerPage: pag.rowPerPage,
      },
    });
  };
  return (
    <React.Fragment>
      <Box
        style={{
          minWidth: 1440,
          minHeight: "calc(100vh - 60px)",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Header />
        <FilterBar />
        <TableContent
          checkedAble
          tableData={dataListShow.data}
          tableHeader={TableHeader}
          handleCheckData={handleCheckData}
          checkedItems={state.checkedItemList}
          pagination={{
            page: state.pagination.page,
            rowPerPage: state.pagination.rowPerPage,
            length: dataListShow.length,
          }}
          handleChangePagination={handleChangePagination}
        />
      </Box>
    </React.Fragment>
  );
};

export default DeviceContainer;
