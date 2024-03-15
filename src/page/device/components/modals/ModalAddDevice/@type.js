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
  groupId: "",
  deviceId: "",
  camName: "",
  camType: 2,
  camAddr: "",
  camRTSPAddr: "",
  rawRTSPAddr: "",
  camUserRTSP: "",
  camUserRTSPPass: "",
  featureType: "",
  aiType: "",
  smartRecord: false,
  summaryVideo: false,
  humanInstrustion: false,
  faceRecognition: false,
  heatMap: false,
  counting: false,
  attributes: false,
  parkingPlate: false,
  parkingCount: false,
  aiStreamingOut: false,
  featureExtract: false,
  shouldTCP: false,
  camOnvifAddr: "",
  camUserOnvif: "",
  camUserOnvifPass: "",
  ptzWSUrl: "",
  ptzType: "",
  streamType: 1,
  deviceHeathId: "",
  videoFrameRate: 0,
  subCamRTSPAddr: "",
  subCamAddr: "",
  subCamUserRTSP: "",
  subCamUserRTSPPass: "",
  id: "",
  thermal: false,
  lpdlpr: false,
  video_event: false,
  width: 0,
  height: 0,
  featureList: [],
  lng: 10,
  lat: 10,
  deviceType: "IPC",
  note: "",
  recordScheduleId: null,
  recordScheduleStatus: null,
  storagePlaneId: null,
  zone: [],
  addingMode: "KnowAddress",
  address: "",
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
    coordinate: [],
  },
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
  AIProcessingModes: "EDGE",
  attachEventVideo: true,
  attributes: false,
  counting: false,
  faceRecoginition: false,
  heatmap: false,
  humanInstruction: false,
  "LPD-LPR": false,
  "VHD-LPD-LPR": false,
  cameraAddress: "",
  streamType: "RTSP-TCP",
  low: {
    points: [],
  },
  medium: {
    points: [],
  },
  high: {
    points: [],
  },
};

export const schema = yup.object().shape({
  address: yup
    .string()
    .required("Address là trường bắt buộc")
    .matches(IP_REGEX, "Address không đúng định dạng "),
  cameraAddress: yup
    .string()
    .required("cameraAddress là trường bắt buộc")
    .matches(IP_REGEX, "cameraAddress không đúng định dạng "),
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

export const AIFeatureSwitch = {
  attributes: {
    label: "Attributes",
    value: "attributes",
  },
  counting: {
    label: "Counting",
    value: "counting",
  },
  faceRecoginition: {
    label: "Face Recoginition",
    value: "faceRecoginition",
  },
  heatmap: {
    label: "Heatmap",
    value: "heatmap",
  },
  humanInstruction: {
    label: "Human Instruction",
    value: "humanInstruction",
  },
  "LPD-LPR": {
    label: "LPD-LPR",
    value: "LPD-LPR",
  },
  "VHD-LPD-LPR": {
    label: "VHD-LPD-LPR",
    value: "VHD-LPD-LPR",
  },
};

export const streamTypeOption = {
  "RTSP-TCP": {
    label: "RTSP-TCP",
    value: "RTSP-TCP",
  },
  "RTSP-UDP": {
    label: "RTSP-UDP",
    value: "RTSP-UDP",
  },
  P2P: {
    label: "P2P",
    value: "P2P",
  },
};
