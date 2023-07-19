import ViolationInfo from "../page/traffic/component/ItemTable/ViolationInfo";

export const settingArr = [
  {
    label: "Tỉnh/Thành phố",
    key: "name",
    errorMessage: "Name is required",
    minLength: {
      message: "Name is more than 2",
      value: "2",
    },
    type: "text",
  },
  {
    label: "Người ký",
    key: "signer",
    errorMessage: "Signer is required",
    type: "radio",
  },
  {
    label: "Trưởng phòng",
    key: "direct",
    errorMessage: "Direct is required",
    type: "text",
  },
  {
    label: "Phó phòng",
    key: "subDirect",
    errorMessage: "Sub Direct is required",
    type: "text",
  },
  {
    label: "Số điện thoại",
    key: "phone",
    errorMessage: "Phone is required",
    pattern: {
      message: "Phone number is valid",
      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    },
    type: "text",
  },
  {
    label: "Email",
    key: "email",
    errorMessage: "Email is required",
    type: "text",
    pattern: {
      message: "Email is invalid",
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },
];

export const violationError = [
  {
    label: "Không chấp hành hiệu lệnh của tin hiệu giao thông",
    value: "01",
  },
  {
    label: "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo, vạch kẻ đường",
    value: "02",
  },
  {
    label: "Vượt trong các trường hợp cấm vượt",
    value: "03",
  },
  {
    label: "Dừng, đỗ phương tiện trái quy định",
    value: "04",
  },
  {
    label: "Điều khiển phương tiện chạy quá tốc độ",
    value: "05",
  },
  {
    label: "Đi ngược chiều",
    value: "06",
  },
];

export const violationStatus = [
  {
    label: "Vi phạm",
    value: "VP",
  },
  {
    label: "Chờ duyệt lỗi",
    value: "CDVP",
  },
  {
    label: "Chờ duyệt không lỗi",
    value: "CDKVP",
  },
  {
    label: "Chưa định dạng",
    value: "CDD",
  },
  {
    label: "Chờ duyệt định danh",
    value: "CDDD",
  },
  {
    label: "Đã định dạng",
    value: "DDD",
  },
  {
    label: "Có lỗi",
    value: "CVP",
  },
  {
    label: "Không lỗi",
    value: "KVP",
  },
];

export const vehicles = [
  {
    label: "Ô tô",
    value: "car",
  },
  {
    label: "Xe máy",
    value: "motor",
  },
  {
    label: "Xe tải",
    value: "bus",
  },
  {
    label: "Xe bus",
    value: "truck",
  },
  {
    label: "Xe đạp",
    value: "bicycle",
  },
  {
    label: "Xe ba gác",
    value: "tricycles",
  },
  {
    label: "NgườI đi bộ",
    value: "human",
  },
];

export const carsColor = [
  {
    label: "Đen",
    value: "black",
  },
  {
    label: "Trắng",
    value: "white",
  },
  {
    label: "Đỏ",
    value: "red",
  },
  {
    label: "Nâu",
    value: "brown",
  },
  {
    label: "Xanh",
    value: "blue",
  },
  {
    label: "Vàng",
    value: "yellow",
  },
];

export const plateCarsColor = [
  {
    label: "Đen",
    value: "black",
  },
  {
    label: "Xanh",
    value: "blue",
  },
  {
    label: "Vàng",
    value: "yellow",
  },
  {
    label: "Trắng",
    value: "white",
  },
];

export const headerFilterArr = [
  {
    width: 220,
    btnText: "Trạng thái",
    titleDropdownText: "Tất cả trạng thái",
    key: "status",
    list: violationStatus,
    type: "select_multiple",
  },
  {
    width: 220,
    btnText: "Lỗi vi phạm",
    titleDropdownText: "Tất cả lỗi vi phạm",
    key: "errors",
    list: violationError,
    type: "select_multiple",
  },
  {
    width: 220,
    btnText: "Phương tiện",
    titleDropdownText: "Tất cả phương tiện",
    key: "vehicles",
    list: vehicles,
    type: "select_multiple",
  },
  {
    width: 220,
    btnText: "Màu xe",
    titleDropdownText: "Tất cả màu xe",
    key: "carColor",
    list: carsColor,
    type: "select_multiple",
  },
  {
    width: 220,
    btnText: "Màu biển xe",
    titleDropdownText: "Tất cả màu biển",
    key: "plateCarColor",
    list: plateCarsColor,
    type: "select_multiple",
  },
  {
    key: "date",
    type: "date_range",
  },
];

export const columnsTrafficData = [
  {
    field: "id",
    name: "#",
    width: 150,
  },
  {
    field: "statusEvent",
    name: "Thông tin Vi Phạm",
    width: 650,
    component: (data) => {
      return <ViolationInfo data={data} />;
    },
  },
  {
    field: "imageDetail",
    name: "Hình Ảnh Vi Phạm",
    customStyles: {
      flex: 1,
    },
  },
];

export const typeErrEvent = {
  1: "Không chấp hành hiệu lệnh của tin hiệu giao thông",
  2: "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo, vạch kẻ đường",
  3: "Vượt trong các trường hợp cấm vượt",
  4: "Dừng, đỗ phương tiện trái quy định",
  5: "Điều khiển phương tiện chạy quá tốc độ",
  6: "Đi ngược chiều",
};

export const statusErrEvent = {
  VP: "Vi phạm",
  CDVP: "Chờ duyệt lỗi",
  CDKVP: "Chờ duyệt không lỗi",
  CDD: "Chưa định danh",
  CDDD: "Chờ duyệt định danh",
  DDD: "Đã định danh",
  CVP: "Có lỗi",
  KVP: "Không lỗi",
};

export const colorStatusErrEvent = {
  VP: {
    backgroundColor: "rgba(225, 252, 239, 1)",
    color: "rgba(24, 106, 59, 1)",
  },
  CDVP: {
    backgroundColor: "rgba(255, 170, 170, 1)",
    color: "rgba(255, 0, 0, 1)",
  },
  CDKVP: {
    backgroundColor: "rgba(210, 180, 222, 1)",
    color: "rgba(74, 35, 90, 1)",
  },
  CDD: {
    backgroundColor: "rgba(169, 204, 227, 1)",
    color: "rgba(0, 0, 255, 1)",
  },
  CDDD: {
    backgroundColor: "rgba(169, 204, 227, 1)",
    color: "rgba(255, 0, 0, 1)",
  },
  DDD: {
    backgroundColor: "rgba(169, 204, 227, 1)",
    color: "rgba(0, 132, 21, 1)",
  },
  KVP: {
    backgroundColor: "rgba(225, 252, 239, 1)",
    color: "rgba(24, 106, 59, 1)",
  },
  DXL: {
    backgroundColor: "rgba(171, 178, 185, 1)",
    color: "rgba(23, 32, 42, 1)",
  },
};
