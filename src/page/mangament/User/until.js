import { Checkbox } from "@material-ui/core";
export const headerTitle = [
  "UserName",
  "Customer",
  "Role",
  "Email",
  "Phone",
  "Type",
  "CreateDate",
  "LastModified",
  "WebAdminAccess",
  "FilterNotification",
  "Level",
];

export const header = {
  no: {
    label: "No",
  },
  UserName: {
    label: "UserName",
  },
  Customer: {
    label: "Customer",
  },
  Role: {
    label: "Role",
  },
  Email: {
    label: "Email",
  },
  Phone: {
    label: "Phone",
  },
  Type: {
    label: "Type",
  },
  CreateDate: {
    label: "Create Date",
  },
  LastModified: {
    label: "Last Modified",
  },
  WebAdminAccess: {
    label: "Web Admin Access",
  },
  FilterNotification: {
    label: "Filter Notification",
  },
  Level: {
    label: "Level",
  },
};

export const contentTable = Array.from(Array(5)).map((_, index) => {
  return {
    UserName: "test",
    Customer: "Customer",
    Role: "Role",
    Email: "Email",
    Phone: "Phone",
    Type: "Type",
    CreateDate: "Create Date",
    LastModified: "Last Modified",
    WebAdminAccess: "Web Admin Access",
    FilterNotification: "Filter Notification",
    Level: "Level",
    Action: "Action",
  };
});
