export const initalColumns = [
  { key: "id", label: "Id", maxWidth: 100, minWidth: 100, textAlign: "center" },
  {
    key: "type",
    label: "Type",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "customer_name",
    label: "Customer Name",
    maxWidth: 150,
    minWidth: 150,
    textAlign: "left",
  },
  {
    key: "address",
    label: "Address",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "phone",
    label: "Phone",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "email",
    label: "Email",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "access_key",
    label: "Access Key",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "secret_key",
    label: "Secret Key",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "created_date",
    label: "Create date",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "last_modified",
    label: "Last Modified",
    maxWidth: 100,
    minWidth: 100,
  },
];

export const initalCheckedHeader = {
  id: true,
  type: true,
  customer_name: true,
  address: true,
  phone: true,
  email: false,
  access_key: true,
  secret_key: true,
  created_date: true,
  last_modified: true,
};

export const fileList = [
  {
    name: "CSV",
    value: "csv",
  },
  {
    name: "EXCEL",
    value: "excel",
  },
];
