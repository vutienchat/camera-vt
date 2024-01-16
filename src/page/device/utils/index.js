import React from "react";
import OfflineIcon from "../Icon/OfflineIcon";
import OnlineIcon from "../Icon/OnlineIcon";
import Recording from "../Icon/Recording";
import NoRecording from "../Icon/NoRecording";
import TrashIcon from "../Icon/TrashIcon";

export const Status = {
  1: {
    label: "Online",
    value: 1,
    component: () => {
      return <OnlineIcon />;
    },
  },
  0: {
    label: "Offline",
    value: 0,
    component: () => {
      return <OfflineIcon />;
    },
  },
};

export const DeviceType = {
  IPC: {
    label: "IPC",
    value: "IPC",
  },
  NVR: {
    label: "NVR",
    value: "NVR",
  },
  "App Screen": {
    label: "App Screen",
    value: "App Screen",
  },
};

export const RecordStatus = {
  1: {
    label: "Record",
    value: 1,
    component: () => {
      return <Recording />;
    },
  },
  0: {
    label: "Do Not Record",
    value: 0,
    component: () => {
      return <NoRecording />;
    },
  },
};

export const Feature = {
  "Smart Record": {
    label: "Smart Record",
    value: "Smart Record",
  },
  HeatMap: {
    label: "HeatMap",
    value: "HeatMap",
  },
  "Smart Search": {
    label: "Smart Search",
    value: "Smart Search",
  },
  "Parking Count": {
    label: "Parking Count",
    value: "Parking Count",
  },
  "Human Instruction": {
    label: "Human Instruction",
    value: "Human Instruction",
  },
  "Face Recognition": {
    label: "Face Recognition",
    value: "Face Recognition",
  },
};

export const headerDeviceFilterArr = [
  {
    width: 200,
    btnText: "AI Feature",
    titleDropdownText: "All Feature",
    key: "aiFeature",
    list: Object.values(Feature),
    type: "select_multiple",
  },
  {
    width: 200,
    btnText: "Device Type",
    titleDropdownText: "All Device Type",
    key: "deviceType",
    list: Object.values(DeviceType),
    type: "select_multiple",
  },
  {
    width: 200,
    btnText: "Status",
    titleDropdownText: "All Status",
    key: "status",
    list: Object.values(Status),
    listObject: Status,
    type: "select",
  },
  {
    width: 200,
    btnText: "Recording",
    titleDropdownText: "All Recording Status",
    key: "recording",
    list: Object.values(RecordStatus),
    listObject: RecordStatus,
    type: "select",
  },
];


export const lowerCaseStringCustom = (numberChecked, originalString) => {
  return `${numberChecked ? numberChecked : "All"} ${originalString}`;
};
