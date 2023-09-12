import {
  Box,
  InputAdornment,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  StreamServer,
  BoxCircleChar,
  StackedBarChartCustom,
  TabTable,
} from "./components";
import {
  colorsCameraStorage,
  colorsRecordState,
  dataBarCam,
  dataCameraStorage,
  dataRecordState,
} from "./@type";
import SearchIcon from "@material-ui/icons/Search";
import _ from "lodash";

const data = Array.from(Array(14)).map((_, index) => ({
  id: index + 1,
  name: `service ${index}`,
  state: index % 2 !== 0 ? "Normal" : "Error",
  camera: "100/200",
  on: Math.floor(Math.random() * 10) + 200,
  off: Math.floor(Math.random() * 5) + 30,
  error: Math.floor(Math.random() * 300),
  errorMes: "hjagsdfkgasdfhasdlfsadlkl;fl;aksd",
}));

const RecordingCamera = () => {
  const [isViewTable, setIsViewTable] = useState(false);
  const [camDataBar, setCamDataBar] = useState({ ...dataBarCam });

  const handleHideData = (key) => {
    const dataChange = { ...camDataBar[key], active: !camDataBar[key].active };
    const newData = _.cloneDeep({
      ...camDataBar,
      [key]: dataChange,
    });
    setCamDataBar(newData);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingBottom: 50,
          }}
        >
          <StreamServer />
          <BoxCircleChar
            label={"Service Recording State"}
            data={dataRecordState}
            COLORS={colorsRecordState}
          />
          <BoxCircleChar
            label={"Camera Storage"}
            data={dataCameraStorage}
            COLORS={colorsCameraStorage}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "91%", padding: "24px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: isViewTable ? "space-evenly" : "flex-end",
                alignItems: "center",
                paddingBottom: 24,
              }}
            >
              {isViewTable && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    variant="outlined"
                    style={{ flex: 1 }}
                    placeholder="Search by device name, device ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    style={{ width: 250, marginInline: 20 }}
                  />
                </Box>
              )}
              <Box
                style={
                  !isViewTable
                    ? { marginRight: 20, marginTop: 10 }
                    : { width: 200 }
                }
              >
                <Switch
                  size="medium"
                  checked={isViewTable}
                  onChange={(e) => setIsViewTable(e.target.checked)}
                />
                <span>Table view</span>
              </Box>
            </Box>
            {!isViewTable ? (
              <>
                <StackedBarChartCustom
                  data={data}
                  listBar={Object.values(camDataBar).reverse()}
                  handleHideData={handleHideData}
                />
              </>
            ) : (
              <TabTable data={data} />
            )}
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default RecordingCamera;
