import ViolationInfo from "../page/traffic/component/ItemTable/ViolationInfo";

export const SPECIAL_CHARACTER_TEXT = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#0-9]/
export const SPECIAL_CHARACTER_NUMBER = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#a-zA-ZÀ-ỹ\s]/

export const getSpecialCharacter = (type) => {
  let regex
  
  if(type === 'number') {
    regex = 'a-zA-ZÀ-ỹ\s'
  } else if (type === 'text') {
    regex = '0-9'
  }


  // const pattern = new RegExp(/[-!$%^&*()_+|~=`{}\\[\]:\\\/;<>?,.@#' + + `]\/)

  return '\/[-!$%^&*()_+|~=`{}\\[\]:\\\/;<>?,.@#' + + `]\/`
}

export const settingArr = [
  {
    label: "Người ký",
    key: "signer",
    type: "radio",
  },
  {
    label: "Trưởng phòng",
    key: "direct",
    type: "text",
    maxLength: 10,
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT
  },
  {
    label: "Phó phòng",
    key: "subDirect",
    type: "text",
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT
  },
  {
    label: "Số điện thoại",
    key: "phone",
    type: "text",
    pattern: /\d+/,
    checkSpecialCharater: SPECIAL_CHARACTER_NUMBER
  },
  {
    label: "Email",
    key: "email",
    type: "text",
  },
];

export const violationError = [
  { label: "Không chấp hành hiệu lệnh của tin hiệu giao thông", value: 1 },
  {
    label: "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo, vạch kẻ đường",
    value: 2,
  },
  { label: "Vượt trong các trường hợp cấm vượt", value: 3 },
  { label: "Dừng, đỗ phương tiện trái quy định", value: 4 },
  { label: "Điều khiển phương tiện chạy quá tốc độ", value: 5 },
  { label: "Đi ngược chiều", value: 6 },
];

export const violationStatus = [
  { label: "Vi phạm", value: "VP" },
  { label: "Chờ duyệt lỗi", value: "CDVP" },
  { label: "Chờ duyệt không lỗi", value: "CDKVP" },
  { label: "Chưa định dạng", value: "CDD" },
  { label: "Chờ duyệt định danh", value: "CDDD" },
  { label: "Đã định dạng", value: "DDD" },
  { label: "Có lỗi", value: "CVP" },
  { label: "Không lỗi", value: "KVP" },
];

export const vehicles = [
  { label: "Ô tô", value: "car" },
  { label: "Xe máy", value: "motor" },
  { label: "Xe tải", value: "bus" },
  { label: "Xe bus", value: "truck" },
  { label: "Xe đạp", value: "bicycle" },
  { label: "Xe ba gác", value: "tricycles" },
  { label: "NgườI đi bộ", value: "human" },
];

export const carsColor = [
  { label: "Đen", value: "black" },
  { label: "Trắng", value: "white" },
  { label: "Đỏ", value: "red" },
  { label: "Nâu", value: "brown" },
  { label: "Xanh", value: "blue" },
  { label: "Vàng", value: "yellow" },
];

export const plateCarsColor = [
  { label: "Đỏ", value: "red" },
  { label: "Xanh", value: "blue" },
  { label: "Vàng", value: "yellow" },
  { label: "Trắng", value: "white" },
];

export const headerFilterArr = [
  {
    width: 300,
    btnText: "Trạng thái",
    titleDropdownText: "Tất cả trạng thái",
    key: "status",
    list: violationStatus,
    type: "select_multiple",
  },
  {
    width: 300,
    btnText: "Lỗi vi phạm",
    titleDropdownText: "Tất cả lỗi vi phạm",
    key: "errors",
    list: violationError,
    type: "select_multiple",
  },
  {
    width: 300,
    btnText: "Phương tiện",
    titleDropdownText: "Tất cả phương tiện",
    key: "vehicles",
    list: vehicles,
    type: "select_multiple",
  },
  {
    width: 300,
    btnText: "Màu xe",
    titleDropdownText: "Tất cả màu xe",
    key: "carColor",
    list: carsColor,
    type: "select_multiple",
  },
  { key: "date", type: "date_range" },
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
    customStyles: { flex: 1 },
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

export const status = [
  { label: "Tất cả", value: "all" },
  { label: "Vi phạm chờ duyệt", value: "01" },
  { label: "Lỗi đang xử lý", value: "02" },
  { label: "Ra thông báo VP", value: "03" },
];

export const listSceneTab = [
  { label: "Thông tin hiện trường", value: "scence_info" },
  { label: "Thông tin xử phạt", value: "ban_info" },
];

export const noErrorReasonList = [
  {
    label: "Xe ưu tiên",
    value: "01",
  },
  {
    label: "Tốc độ đúng quy định",
    value: "02",
  },
  {
    label: "Xe rẽ phải ở đoạn đường được rẽ phải",
    value: "03",
  },
  {
    label: "Xe di chuyển theo hiệu lệnh người điều khiển giao thông",
    value: "04",
  },
  {
    label: "Lỗi đèn tín hiệu",
    value: "05",
  },
  {
    label: "Không đủ cơ sở chứng minh vi phạm",
    value: "06",
  },
];

export function getValueObjectByPath(path, obj, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export const convertToAbbreviation = (string) => {
  const cleanedName = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Chia tên thành các phần
  const parts = cleanedName.split(" ");

  // Tạo chuỗi viết tắt
  const abbreviation = parts.map((part) => part[0]).join("");

  return abbreviation;
};
