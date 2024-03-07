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
});
