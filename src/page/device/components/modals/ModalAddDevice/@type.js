import * as yup from "yup";
import {
  IP_REGEX,
  regexAllowVietnameseNoSpecialChars,
} from "../../../utils/regex";

const data = Array.from(Array(5)).map((_, idx) => ({
  name: `test${idx}`,
  id: idx,
}));

const dataTour = Array.from(Array(5)).map((_, idx) => ({
  name: `test${idx}`,
  id: idx,
  listPreset: [],
}));

export const defaultFormValue = {
  addingMode: "KnowAddress",
  address: "",
  deviceType: "IPC",
  username: "",
  password: "",
  VisionMode: "DayCamera",
  isDefaultPort: true,
  port: "",
  startIP: 1,
  endIP: 255,
  ipAddress: ["192", "168", "0"],
  location: "60 Hoang Quoc Viet",
  line: {
    name: "",
    points: [],
  },
  listZone: [],
  preset: data,
  tour: dataTour,
  primaryStream: {
    codeC: "H264",
    resolution: "1920x1080",
  },
  secondaryStream: {
    codeC: "H264",
    resolution: "1920x1080",
  },
};

export const schema = yup.object().shape({
  address: yup
    .string()
    .required("Address là trường bắt buộc")
    .matches(IP_REGEX, "Address không đúng định dạng "),
  // address: yup.string().required("Tên server là trường bắt buộc"),
  port: yup.number().max(5),
  endIp: yup.number(),
  deviceName: yup
    .string()
    .required("Device Name là trường bắt buộc")
    .matches(
      regexAllowVietnameseNoSpecialChars,
      "Device Name không đúng định dạng "
    ),
  storagePlan: yup.string().required("Storage plan là trường bắt buộc"),
});

export const codecVideo = {
  H264: {
    label: "H264",
    value: "H264",
  },
  H265: {
    label: "H265",
    value: "H265",
  },
  MJPEG: {
    label: "MJPEG",
    value: "MJPEG",
  },
};

export const resolution = {
  "320x180": {
    label: "320x180",
    value: "320x180",
  },
  "480x270": {
    label: "480x270",
    value: "480x270",
  },
  "800x450": {
    label: "800x450",
    value: "800x450",
  },
  "1280x720": {
    label: "1280x720",
    value: "1280x720",
  },
  "1920x1080": {
    label: "1920x1080 (Recommended)",
    value: "1920x1080",
  },
};
