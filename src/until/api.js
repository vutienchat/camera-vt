import api from "./base-api";

const baseUrl = "http://localhost:3001/api";

export const addGroup = (data) => {
  return new Promise(() => {
    api.post(`${baseUrl}/groupMngt`, data);
  });
};
