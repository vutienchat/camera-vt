import React, { useContext, useMemo } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import FilterBar from "./FilterTable";
import TableContent from "../Table/TableContent";
import { TableHeader } from "../utils";
import { DeviceContext } from "./DeviceProvider";

const DeviceContainer = () => {
  const { state, handleCheckData, handleChangePagination, dataListShow, dispatch} =
    useContext(DeviceContext);

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
          dispatch={dispatch}
          iconPagination={true}
        />
      </Box>
    </React.Fragment>
  );
};

export default DeviceContainer;
