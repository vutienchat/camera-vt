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
  lat: 21.046215,
  lng: 105.785733,
  deviceType: "IPC",
  note: "",
  recordScheduleStatus: null,
  recordScheduleId: null,
  storagePlaneId: null,
  zone: [],
  addingMode: "KnowAddress",
  // address: "",
  username: "",
  password: "",
  VisionMode: "DayCamera",
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
    frameRate: "",
    bitrate: "",
  },
  secondaryStream: {
    codeC: "H264",
    resolution: "1920x1080",
    frameRate: "",
    bitrate: "",
  },
  AIProcessingModes: "serverAI",
  attachEventVideo: true,
  attributes: false,
  counting: true,
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

const dataObject = {
  "Wed-3": true,
  "Wed-9": true,
  "Wed-10": true,
  "Wed-17": true,
  "Fri-17": true,
  "Sat-17": true,
  "Sat-9": true,
  "Sat-8": true,
  "Sat-7": true,
  "Sat-6": true,
  "Sat-5": false,
  "Sat-4": true,
  "Fri-3": true,
  "Sun-0": true,
  "Sun-11": true,
  "Sun-14": true,
  "Sun-15": true,
  "Sun-22": true,
  "Wed-22": true,
  "Mon-21": true,
  "Mon-20": true,
  "Mon-14": true,
  "Mon-13": true,
  "Mon-12": true,
  "Mon-11": true,
  "Tue-11": true,
  "Tue-10": true,
  "Tue-9": true,
  "Tue-5": true,
  "Tue-4": true,
  "Mon-3": true,
};

const convertData = (obj) => {
  const newData = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      const [day, time] = key.split("-");
      const timeRange = `${time}-${time}`;
      const lowerDay = day.toLowerCase();
      if (!newData[lowerDay]) {
        newData[lowerDay] = [timeRange];
      } else {
        const lastRange =
          newData[lowerDay][newData[lowerDay].length - 1].split("-");
        const start = parseInt(lastRange[0]);
        const end = parseInt(lastRange[1]);

        if (parseInt(time) === end + 1) {
          newData[lowerDay][newData[lowerDay].length - 1] = `${start}-${time}`;
        } else {
          newData[lowerDay].push(timeRange);
        }
      }
    }
  });
  return newData;
};

const convertBackToObject = (newData) => {
  const dataObject = {};
  if (!newData) return;
  Object.entries(newData).forEach(([day, timeRanges]) => {
    timeRanges.forEach((timeRange) => {
      const [start, end] = timeRange.split("-");
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        const key = `${day.charAt(0).toUpperCase()}${day.slice(1)}-${i}`;
        dataObject[key] = true;
      }
    });
  });
  return dataObject;
};

console.log(
  "convertBackToObject",
  convertBackToObject(convertData(dataObject))
);
