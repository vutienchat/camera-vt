export const dataRecordState = [
  { name: "Normal", value: 29 },
  { name: "Error", value: 1 },
];

export const colorsRecordState = ["#4e8ff7", "#f19d6c"];

export const dataCameraStorage = [
  { name: "On", value: 40 },
  { name: "Error", value: 10 },
  { name: "Off", value: 5 },
];

export const colorsCameraStorage = ["#4e8ff7", "#f19d6c", "#d3d3d3"];

export const dataHead = [
  "#",
  "Service name",
  "State",
  "Camera",
  "On/Error/Off",
  "Error Message",
  "Action",
];

export const typeState = {
  Error: {
    label: "Error",
    color: "#f19d6c",
  },
  Normal: {
    label: "Normal",
    color: "#4e8ff7",
  },
  On: {
    label: "On",
    color: "#4e8ff7",
  },
  Off: {
    label: "Off",
    color: "#d3d3d3",
  },
};

export const dataBarCam = {
  on: {
    key: "on",
    color: "#4e8ff7",
    active: true,
  },
  error: {
    key: "error",
    color: "#f19d6c",
    active: true,
  },
  off: {
    key: "off",
    color: "#d3d3d3",
    active: true,
  },
};
