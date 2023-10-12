import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";

export const QUERY_KEYS = {
  GROUP_LIST: "group_list",
  GROUP_TYPES_LIST: "group_types_list",
  MARKERS_LIST: "markers_list",
  TRAFFIC_LIST: "traffic_list",
  CAMERA_LIST: "camera_list",
};

export const listTotal = {
  totalVisit: {
    icon: AccessibilityNewIcon,
    label: "Visits",
    value: 4202,
  },
  humans: {
    icon: AccessibilityNewIcon,
    label: "Human",
    value: 4202,
  },
  cars: {
    icon: DirectionsCarIcon,
    label: "Car",
    value: 4202,
  },
  motos: {
    icon: MotorcycleIcon,
    label: "Moto",
    value: 4202,
  },
  bicycle: {
    icon: DirectionsBikeIcon,
    label: "Bicycle",
    value: 4202,
  },
  truck: {
    icon: LocalShippingIcon,
    label: "Truck",
    value: 4202,
  },
  bus: {
    icon: DirectionsBusIcon,
    label: "Bus",
    value: 4202,
  },
  other: {
    icon: AccessibilityNewIcon,
    label: "Other",
    value: 4202,
  },
};
