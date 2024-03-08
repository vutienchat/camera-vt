import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import FormIpAddress from "../../../BaseForm/FormIpAddress";

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

const AddMode = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { addingMode, isDefaultPort, ipAddress } = watch();

  const setIPAddress = (data) => {
    setValue("ipAddress", data);
  };

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
                  width={135}
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
        <Grid container item spacing={1}>
          <Grid item>
            <BaseFormGroup
              label={"Port"}
              wrap={true}
              width={135}
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
          <Grid item style={{ paddingTop: 12 }}>
            <Button
              style={{
                background: "#fff",
                border: "solid 1px #DD3D4B",
                width: 135,
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
          {/* <Grid item style={{ paddingTop: 35 }}>
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
          </Grid> */}
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item>
          <BaseFormGroup
            label={"Username"}
            wrap={true}
            showErrorMessage={true}
            error={errors["username"]}
            width={135}
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
            width={135}
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
      </Grid> */}
    </Box>
  );
};

export default AddMode;
