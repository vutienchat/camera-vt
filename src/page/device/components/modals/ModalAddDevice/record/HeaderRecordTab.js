import { Box, Typography, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { DeviceContext } from "../../../DeviceProvider";
import SelectContainTable from "../../../SelectContainTable";
import { storagePlanHeader } from "../../../../utils";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import { useFormContext } from "react-hook-form";
import Select from "../../../Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

const Schedule = {
  0: {
    label: "Schedule 001",
    value: 0,
  },
};

const HeaderRecordTab = ({
  handleRecoding,
  selectedStoragePlan,
  handleClickColumns,
  setIsOpenEditSchedule,
  noRecoding,
}) => {
  const { state } = useContext(DeviceContext);
  const {
    formState: { errors },
  } = useFormContext();

  const classes = styles();

  const handleOpenModalEditSchedule = () => {
    setIsOpenEditSchedule(true);
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 50,
      }}
    >
      <Box style={{ display: "flex", gap: 24 }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            width: 180,
            gap: 10,
          }}
        >
          <Typography>Recording:</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={state.switchState.recording}
                onChange={handleRecoding}
                name="gilad"
                className={classes.switch}
              />
            }
            label={state.switchState.recording ? "ON" : "OFF"}
          />
        </Box>
        {/* <FormControlLabel
          control={
            <CustomSwitch
              checked={state.switchState.recording}
              onChange={handleRecoding}
              name="checkedB"
            />
          }
          label="Recording"
        /> */}
        <Box
          style={{
            opacity: !state.switchState.recording && "0.3",
            pointerEvents: !state.switchState.recording && "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <BaseFormGroup
            label={"Storage Plan"}
            isRequired={noRecoding ? false : true}
            wrap={false}
            width={410}
            color={"black"}
            customStyle={{ alignItems: "flex-start" }}
            showErrorMessage={
              noRecoding
                ? false
                : Object.keys(selectedStoragePlan).length === 0 &&
                  selectedStoragePlan.constructor === Object
                ? true
                : false
            }
            error={errors["storagePlan"]}
            component={
              <SelectContainTable
                width={300}
                dropdownWidth={420}
                searchBarType={"storagePlan"}
                btnText={"Select"}
                list={list}
                tableHeader={storagePlanHeader}
                selectedStoragePlan={selectedStoragePlan}
                handleClickColumns={handleClickColumns}
                noRecoding={noRecoding}
              />
            }
          />
          <BaseFormGroup
            label={"Schedule"}
            isRequired={false}
            wrap={false}
            width={270}
            customStyle={{ alignItems: "flex-start" }}
            showErrorMessage={false}
            component={
              <Select
                list={Object.values(Schedule)}
                btnText={"Record All"}
                width={200}
                titleDropdownText={"Record All"}
                positionDropDown={"right"}
                listObject={Schedule}
                canEdit
                handleOpenModalEditSchedule={handleOpenModalEditSchedule}
                noRecoding={noRecoding}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = makeStyles({
  switch: {
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#9c9999",
    },
    "& .MuiSwitch-colorSecondary.Mui-checked": {
      color: "#DD3D4B",
    },
    "& .MuiSwitch-switchBase": {
      color: "#939393",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#9c9999",
    },
  },
});
export default HeaderRecordTab;
