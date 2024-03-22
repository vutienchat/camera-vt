import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import FormIpAddress from "../../../BaseForm/FormIpAddress";
import { listDevice } from "../../../../utils";

const regex =
  /^((\d{1,3}\.){3}\d{1,3}|\b(?:[a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}\b)(:\d+)?(\/\w+)*$/;

const addModeOption = [
  {
    value: "KnowAddress",
    label: "Know Address",
  },
  {
    value: "SegmentScan",
    label: "Segment Scan",
  },
];

const AddMode = ({ setListDeviceScanned }) => {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext();
  const { addingMode } = watch();

  const [dataScan, setDataScan] = useState({
    address: "",
    ipAddress: ["192", "168", "0"],
    startIP: 1,
    endIP: 255,
    port: "",
  });

  const handleChange = (data, type) => {
    console.log(data, type);
    setDataScan((prev) => ({ ...prev, [type]: data }));
  };

  console.log("data", dataScan);

  const isDisable =
    addingMode === "KnowAddress" && !dataScan.address ? true : false;

  const handleScan = () => {
    setListDeviceScanned(listDevice);
    Object.keys(dataScan).forEach((it) => {
      register(it, { value: dataScan[it] });
    });
  };

  console.log("ww", watch());

  return (
    <Box
      style={{
        width: "302px",
        borderRadius: 8,
        border: "solid 1px #E5E7EB",
        padding: "10px 10px",
        boxSizing: "border-box",
      }}
    >
      <BaseFormRadio
        label={"Adding Mode"}
        name={"addingMode"}
        options={addModeOption}
        wrap={false}
      />

      <Grid container spacing={1} direction="row" wrap="wrap">
        <Grid item xs={9}>
          {addingMode === "KnowAddress" ? (
            <BaseFormGroup
              label={"Address"}
              isRequired={true}
              wrap={true}
              width={280}
              customStyle={{ alignItems: "flex-start" }}
              showErrorMessage={true}
              error={errors["address"]}
              component={
                <TextField
                  length={255}
                  variant="outlined"
                  size="small"
                  placeholder="IP / Hostname / RTSP link"
                  fullWidth
                  value={dataScan.address}
                  onChange={(e) => handleChange(e.target.value, "address")}
                />
              }
            />
          ) : (
            <Grid
              item
              xs={12}
              container
              spacing={1}
              direction="row"
              wrap="nowrap"
            >
              <Grid item>
                <BaseFormGroup
                  label={"Start IP"}
                  isRequired={true}
                  wrap={true}
                  width={135}
                  customStyle={{ alignItems: "flex-start" }}
                  component={
                    <FormIpAddress
                      type={"startIP"}
                      label={"Start"}
                      ipAddress={dataScan.ipAddress}
                      handleChange={handleChange}
                      valueIp={dataScan.startIP}
                    />
                  }
                />
              </Grid>
              <Grid item>
                <BaseFormGroup
                  label={"End IP"}
                  isRequired={true}
                  wrap={true}
                  width={135}
                  component={
                    <FormIpAddress
                      type={"endIP"}
                      label={"End"}
                      ipAddress={dataScan.ipAddress}
                      handleChange={handleChange}
                      valueIp={dataScan.endIP}
                    />
                  }
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={1}>
          <Grid item>
            <BaseFormGroup
              label={"Port"}
              wrap={true}
              width={135}
              component={
                <TextField
                  // name={"port"}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="- - - -"
                  length={5}
                  // type={"number"}
                  value={dataScan.port}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) return;
                    handleChange(e.target.value.slice(0, 5), "port");
                  }}
                />
              }
            />
          </Grid>
          <Grid item style={{ paddingTop: 12 }}>
            <Button
              style={{
                background: "#fff",
                border: "solid 1px #DD3D4B",
                width: 135,
                height: 34,
                marginTop: 20,
              }}
              disabled={isDisable}
              onClick={handleScan}
            >
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#DD3D4B",
                  textAlign: "center",
                }}
              >
                Scan Device
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMode;
