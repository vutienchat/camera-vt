import React from "react";
import OfflineIcon from "../Icon/OfflineIcon";
import OnlineIcon from "../Icon/OnlineIcon";
import Recording from "../Icon/Recording";
import NoRecording from "../Icon/NoRecording";
import FeatureAi from "../components/FeatureAi";
import DeviceStatus from "../components/DeviceStatus";
import DurationIcon from "../Icon/DurationIcon";
import Thumbnail from "../components/Thumbnail";

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

export const Status = {
  1: {
    label: "Online",
    shortWord: "ON",
    value: 1,
    component: () => {
      return <OnlineIcon />;
    },
  },
  0: {
    label: "Offline",
    shortWord: "OFF",
    value: 0,
    component: () => {
      return <OfflineIcon />;
    },
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

export const TableHeader = [
  {
    field: "stt",
    name: "#",
    customStyles: {
      minWidth: "60px",
      maxWidth: "60px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "thumbnail",
    name: "Thumbnail",
    customStyles: {
      minWidth: "130px",
      maxWidth: "130px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      <Thumbnail data={data} />;
    },
  },
  {
    field: "deviceName",
    name: "Device Name",
    customStyles: {
      minWidth: "130px",
      maxWidth: "130px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "deviceType",
    name: "Device Type",
    customStyles: {
      minWidth: "100px",
      maxWidth: "100px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "group",
    name: "Group",
    customStyles: {
      minWidth: "150px",
      maxWidth: "150px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "status",
    name: "Status",
    customStyles: {
      minWidth: "90px",
      maxWidth: "90px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      return <DeviceStatus data={data} />;
    },
  },
  {
    field: "recording",
    name: "Recording",
    customStyles: {
      minWidth: "90px",
      maxWidth: "90px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      const selectRecording = RecordStatus[data.recording];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <selectRecording.component />
          {/* <p>{selectRecording.label}</p> */}
        </div>
      );
    },
  },
  {
    field: "location",
    name: "Location",
    customStyles: {
      minWidth: "150px",
      maxWidth: "150px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "lastModify",
    name: "Last Modify",
    customStyles: {
      minWidth: "200px",
      maxWidth: "200px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "aiFeature",
    name: "Ai Feature",
    customStyles: {
      minWidth: "350px",
      maxWidth: "350px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      const arrayFeature = data.aiFeature.split(",");
      const arrayOfValue = arrayFeature.map((item) => Feature[item]);
      return <FeatureAi arrayOfValue={arrayOfValue} />;
    },
  },
];

export const storagePlanHeader = [
  {
    field: "name",
    name: "Name",
    customStyles: {
      minWidth: "100px",
      maxWidth: "100px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "period",
    name: "Period",
    customStyles: {
      minWidth: "50px",
      maxWidth: "50px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "activated",
    name: "Activated",
    customStyles: {
      minWidth: "60px",
      maxWidth: "60px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "expiration",
    name: "Expiration",
    customStyles: {
      minWidth: "105px",
      maxWidth: "105px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
]

export const headerDeviceStatus = [
  {
    field: "stt",
    name: "#",
    customStyles: {
      minWidth: "40px",
      maxWidth: "40px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "group",
    name: "Group",
    customStyles: {
      minWidth: "120px",
      maxWidth: "120px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  },
  {
    field: "offTime",
    name: "Off Time",
    customStyles: {
      minWidth: "90px",
      maxWidth: "90px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      return <p>{data.offTime}</p>;
    },
  },
  {
    field: "duration",
    name: "Off Time Duration",
    customStyles: {
      minWidth: "90px",
      maxWidth: "90px",
      padding: 10,
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    component: (data) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <DurationIcon />
          <p>{data.duration}</p>
        </div>
      );
    },
  },
];
export const tableData = [
  {
    id: 1,
    thumbnail: null,
    deviceName: "Camera-4",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges43434343434343434",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 2,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 1,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 3,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 0,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 4,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 5,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 0,
    recording: 1,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature:
      "Parking Count,HeatMap,Face Recognition,Human Instruction,Smart Search,Smart Record",
  },
  {
    id: 6,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 7,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 8,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 9,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 10,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 11,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 12,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 13,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 14,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 15,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 16,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 17,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 18,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 19,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 20,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 21,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 22,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
  {
    id: 23,
    thumbnail: null,
    deviceName: "Camera- 80",
    deviceType: "IPC",
    group: "LLQ_Building",
    status: 1,
    recording: 0,
    location: "116 Eryn Forges",
    lastModify: "12/27/2023 08:26:25",
    aiFeature: "Parking Count,HeatMap,Face Recognition",
    duration: "2h 34m 56s",
    offTime: "12/27/2023 08:26:25",
  },
];

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

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const hours = Array.from(Array(25)).map((_, indx) => indx);

export const listDevice = Array.from(Array(10)).map((_, indx) => ({
  label: `test ${indx}`,
  id: indx,
  ip: "179.229.40.98",
  vendor: "AXIS",
  added: indx % 2 === 0,
  firmware: "1.2.3",
}));
