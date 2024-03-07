import { Box, FormControlLabel, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import CustomSwitch from "../../../Accordion/CustomSwitch";
import { DeviceContext } from "../../../DeviceProvider";
import * as type from "../../../../reducers/type";
import SelectContainTable from "../../../SelectContainTable";
import { storagePlanHeader } from "../../../../utils";
import BaseButton from "../../../BaseButton";

const list = [
  {
    id: 1,
    name: "Plan-001454544444444444",
    period: "3 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
  {
    id: 2,
    name: "Plan-001",
    period: "3 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
  {
    id: 3,
    name: "Plan-001",
    period: "133333 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
  {
    id: 4,
    name: "Plan-001",
    period: "3 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
  {
    id: 5,
    name: "Plan-001",
    period: "3 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
  {
    id: 6,
    name: "Plan-001",
    period: "3 days",
    activated: "6/10",
    expiration: "10/12/2023",
  },
];
const HeaderRecordTab = ({handleRecoding,selectedStoragePlan,handleClickColumns}) =>{
  const { state } = useContext(DeviceContext);

  return(
    <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <Box style={{ display: "flex", gap: 24 }}>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={state.switchState.recording}
                  onChange={handleRecoding}
                  name="checkedB"
                />
              }
              label="Recording"
            />
            <Box
              style={{
                opacity: !state.switchState.recording && "0.3",
                pointerEvents: !state.switchState.recording && "none",
              }}
            >
              <Typography></Typography>  
              <SelectContainTable
                width={334}
                dropdownWidth={420}
                searchBarType={"storagePlan"}
                btnText={"-- Select --"}
                list={list}
                tableHeader={storagePlanHeader}
                selectedStoragePlan={selectedStoragePlan}
                handleClickColumns={handleClickColumns}
              />
            </Box>
          </Box>
        </Box>
  )
}

export default HeaderRecordTab;