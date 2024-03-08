import { Box } from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import RecordDevice from "../record";
import TabsContainer from "../../../Tabs";
import GeneralTab from "../general";
import PTZControl from "../PTZControl.js";
import Motion from "../motion/index.js";
import ZoneLineController from "../zone-line/index.js";
// var onvif = require("onvif");

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
    children: <ZoneLineController />,
  },
  {
    label: "PTZ Control",
    children: <PTZControl />,
  },
  {
    label: "Motion",
    children: <Motion />,
  },
  {
    label: "Advanced",
    children: "asdfasdf",
  },
];

const FormData = React.memo(({ value }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // gap: 20,
        boxSizing: "border-box",
      }}
    >
      <BaseFormRadio
        label={"Device Type"}
        name={"deviceType"}
        options={deviceTypeOption}
      />
      <TabsContainer tabs={tabConfig} />
    </Box>
  );
});

export default FormData;
