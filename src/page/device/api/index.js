import { Feature } from "../utils";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const exportListDevice = [
  {
    group: "Group1",
    deviceName: "Device1",
    deviceType: "Type1",
    streamType: "Stream1, Hello, Hell",
    featureType: "Feature1",
    primaryStream: "hhshs",
    accessKey: "33jddh",
  },
  {
    group: "Abvfjfj",
    deviceName: "Abvfjfj",
    deviceType: "Abvfjfj",
    streamType: "Abvfjfj",
    featureType: "Abvfjfj",
    featureList: "Abvfjfj",
    location: "Abvfjfj",
    note: "Abvfjfj",
    visionMode: "Abvfjfj",
    aiType: "Abvfjfj",
    aiFeature: "Abvfjfj",
    primaryStream: "Abvfjfj",
    secondaryStream: "Abvfjfj",
    accessKey: "Abvfjfj",
    secretKey: "Abvfjfj",
    recording: "Abvfjfj",
    storagePlan: "Abvfjfj",
  },
];
export const exportExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");
  worksheet.columns = [
    { header: "Group", key: "group", width: 15 },
    { header: "Device Name", key: "deviceName", width: 15 },
    { header: "Device Type", key: "deviceType", width: 15 },
    { header: "Stream Type", key: "streamType", width: 15 },
    { header: "Feature Type", key: "featureType", width: 15 },
    { header: "Feature List", key: "featureList", width: 15 },
    { header: "Location", key: "location", width: 15 },
    { header: "Note", key: "note", width: 15 },
    { header: "Vision Mode", key: "visionMode", width: 15 },
    { header: "Ai Type", key: "aiType", width: 15 },
    { header: "Ai Feature", key: "aiFeature", width: 15 },
    { header: "Primary Stream", key: "primaryStream", width: 15 },
    { header: "Secondary Stream", key: "secondaryStream", width: 15 },
    { header: "Access Key", key: "accessKey", width: 15 },
    { header: "Secret Key", key: "secretKey", width: 15 },
    { header: "Recording", key: "recording", width: 15 },
    { header: "Storage Plan", key: "storagePlan", width: 15 },
  ];
  exportListDevice.forEach((data) => {
    worksheet.addRow(data);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "exported_device_list.xlsx");
};

export const downloadTemplateFile = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");
  worksheet.columns = [
    { header: "Group", key: "group", width: 25 },
    { header: "Device Name", key: "deviceName", width: 25 },
    { header: "Device Type", key: "deviceType", width: 25 },
    { header: "Stream Type", key: "streamType", width: 25 },
    { header: "Feature Type", key: "featureType", width: 25 },
    { header: "Feature List", key: "featureList", width: 25 },
    { header: "Location", key: "location", width: 25 },
    { header: "Note", key: "note", width: 25 },
    { header: "Vision Mode", key: "visionMode", width: 25 },
    { header: "Ai Type", key: "aiType", width: 25 },
    { header: "Ai Feature", key: "aiFeature", width: 25 },
    { header: "Primary Stream", key: "primaryStream", width: 25 },
    { header: "Secondary Stream", key: "secondaryStream", width: 25 },
    { header: "Access Key", key: "accessKey", width: 25 },
    { header: "Secret Key", key: "secretKey", width: 25 },
    { header: "Recording", key: "recording", width: 25 },
    { header: "Storage Plan", key: "storagePlan", width: 25 },
  ];
  worksheet.addRow({
    group: "",
    deviceName: "",
    deviceType: "",
    streamType: "",
    featureType: "",
    featureList: "",
    location: "",
    note: "",
    visionMode: "",
    aiType: "",
    aiFeature: "",
    primaryStream: "",
    secondaryStream: "",
    accessKey: "",
    secretKey: "",
    recording: "",
    storagePlan: "",
  });
  const validateGroup = Object.values(Feature).map((item) => item.label);
  const resultString = [`"${validateGroup.join(",")}"`];
  worksheet.columns.forEach((col, index) => {
    const groupColumnIndex = index + 1;
    switch (col.key) {
      case "group":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "deviceType":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "streamType":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "featureType":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "featureList":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "visionMode":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "aiType":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "aiFeature":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "recording":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      case "storagePlan":
        worksheet.getCell(2, groupColumnIndex).dataValidation = {
          type: "list",
          formulae: resultString,
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: "Invalid Data",
          error: "Please select a valid group from the list.",
        };
        break;
      default:
    }
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "Import_Template.xlsx");
};
