import { Feature, rowObject, worksheetColumns } from "../utils";
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
  worksheet.columns = worksheetColumns;
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
  worksheet.columns = worksheetColumns;
  worksheet.addRow(rowObject);
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
