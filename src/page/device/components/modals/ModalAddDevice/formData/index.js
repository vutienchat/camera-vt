import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import DrawCanvas from "../../../Draw";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import RecordDevice from "../record";
import TabsContainer from "../../../Tabs";
import GeneralTab from "../general";
import FormIpAddress from "../../../BaseForm/FormIpAddress";
import SimplifiedPolygon from "../../../Draw/SimplifiedPolygon";
// var onvif = require("onvif");

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

const deviceTypeOption = [
  {
    value: "IPC",
    label: "IPC",
  },
  {
    value: "NVR",
    label: "NVR",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const tabConfig = [
  {
    label: "General",
    children: <GeneralTab />,
  },
  {
    label: "Recording",
    children: <RecordDevice />,
  },
  {
    label: "Zone / Line",
    children: <DrawCanvas />,
  },
  {
    label: "PTZ Control",
    children: (
      <Box style={{ width: 905, height: 500 }}>
        <SimplifiedPolygon />
      </Box>
    ),
  },
  {
    label: "Advanced",
    children: "asdfasdf",
  },
];

const FormData = React.memo(({ value }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { AddingMode, isDefaultPort, ipAddress } = watch();

  const setIPAddress = (data) => {
    setValue("ipAddress", data);
  };

  // const handleScan = () => {
  //   onvif.Discovery.probe({ ip: ipAddress }, (err, devices) => {
  //     if (err) {
  //       console.error("Error:", err);
  //     } else {
  //       console.log("Discovered devices:", devices);
  //       // Process the discovered devices as needed
  //     }
  //   });
  // };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 20,
        boxSizing: "border-box",
      }}
    >
      <Box
        style={{
          width: "100%",
          borderRadius: 8,
          border: "solid 1px #E5E7EB",
          padding: "10px 20px",
          boxSizing: "border-box",
        }}
      >
        <BaseFormRadio
          label={"Adding Mode"}
          name={"AddingMode"}
          options={addModeOption}
        />

        <Grid container spacing={2} direction="row" wrap="nowrap">
          <Grid item xs={9}>
            {AddingMode === "KnowAddress" ? (
              <BaseFormGroup
                label={"Address"}
                isRequired={true}
                wrap={true}
                width={575}
                customStyle={{ alignItems: "flex-start" }}
                showErrorMessage={true}
                error={errors["address"]}
                component={
                  <BaseInputForm
                    name={"address"}
                    length={255}
                    variant="outlined"
                    size="small"
                    placeholder="IP / Hostname / RTSP link"
                    fullWidth
                  />
                }
              />
            ) : (
              <Grid
                item
                xs={12}
                container
                spacing={2}
                direction="row"
                wrap="nowrap"
              >
                <Grid item>
                  <BaseFormGroup
                    label={"Start IP"}
                    isRequired={true}
                    wrap={true}
                    width={280}
                    customStyle={{ alignItems: "flex-start" }}
                    component={
                      <FormIpAddress
                        type={"startIP"}
                        label={"Start"}
                        ipAddress={ipAddress}
                        setIPAddress={setIPAddress}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <BaseFormGroup
                    label={"End IP"}
                    isRequired={true}
                    wrap={true}
                    width={280}
                    component={
                      <FormIpAddress
                        type={"endIP"}
                        label={"End"}
                        ipAddress={ipAddress}
                        setIPAddress={setIPAddress}
                      />
                    }
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <BaseFormGroup
                label={"Port"}
                wrap={true}
                width={120}
                component={
                  <BaseInputForm
                    name={"port"}
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={isDefaultPort ? true : false}
                    placeholder="- - - -"
                    length={5}
                    type={"number"}
                  />
                }
              />
            </Grid>
            <Grid item style={{ paddingTop: 35 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isDefaultPort"
                    checked={isDefaultPort}
                    onChange={(e) => {
                      setValue("isDefaultPort", e.target.checked);
                      setValue("port", "");
                    }}
                  />
                }
                label="Default"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <BaseFormGroup
              label={"Username"}
              wrap={true}
              showErrorMessage={true}
              error={errors["username"]}
              width={280}
              customStyle={{ alignItems: "flex-start" }}
              component={
                <BaseInputForm
                  name={"username"}
                  variant="outlined"
                  size="small"
                  fullWidth
                  length={255}
                />
              }
            />
          </Grid>
          <Grid item>
            <BaseFormGroup
              label={"Password"}
              wrap={true}
              width={280}
              showErrorMessage={true}
              error={errors["password"]}
              component={
                <BaseInputForm
                  name={"password"}
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="password"
                  length={255}
                />
              }
            />
          </Grid>
          <Grid item style={{ paddingTop: 12 }}>
            <Button
              style={{
                background: "#fff",
                border: "solid 1px #DD3D4B",
                width: 150,
                height: 40,
                marginTop: 20,
              }}
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
      </Box>
      <BaseFormRadio
        label={"Device Type"}
        name={"deviceType"}
        options={deviceTypeOption}
      />
      <TabsContainer tabs={tabConfig} />
      <div style={{ width: 200, position: "relative", background: "red" }}>
        <div>
          <div
            style={{
              position: "absolute",
              left: 200,
              background: "blue",
              width: 200,
            }}
          ></div>
        </div>
      </div>
    </Box>
  );
});

export default FormData;
