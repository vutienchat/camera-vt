import FilePdf from "../page/PDF/FilePdf";
import LiveView from "../page/liveView";
import { Customer } from "../page/mangament/Customer/Customer";
// import { Device } from "../page/mangament/Device";
import { Role } from "../page/mangament/Role";
import { User } from "../page/mangament/User";
import MasterMap from "../page/masterMap/MasterMap";
import TrafficContent from "../page/traffic/TrafficContent";
import RecordingCamera from "../page/recordingCamera";
import HeatmapInsights from "../page/heatmapInsights";
import HistoryEvent from "../page/historyEvent";
import LiveView2 from "../page/liveView2";
import Device from "../page/device";
import Notificaions from "../page/notifications";
import UnitManagement from "../page/unitManagement";

export const routes = [
  { path: "/customer", element: Customer },
  { path: "/user", element: User },
  { path: "/role", element: Role },
  // { path: "/device", element: Device },
  { path: "/", element: Device },
  // { path: "/map", element: Map },
  { path: "/masterMap", element: MasterMap },
  { path: "/traffic", element: TrafficContent },
  { path: "/pdf", element: FilePdf },
  { path: "/recording-camera", element: RecordingCamera },
  { path: "/heatmap-insights", element: HeatmapInsights },
  { path: "/history-event", element: HistoryEvent },
  { path: "/live-view2", element: LiveView2 },
  { path: "/live-view1", element: LiveView },
  { path: "/notifications", element: Notificaions },
  { path: "/unitManagement", element: UnitManagement },
];
