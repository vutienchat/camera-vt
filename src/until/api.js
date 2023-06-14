import api from "./base-api";

const baseUrl = "http://localhost:3001/api";

export const addGroup = (data) => {
  return api.post(`${baseUrl}/groupMngt`, data);
};

export const getListGroup = () => {
  return api
    .get(`${baseUrl}/groupMngt`, {
      // params: query,
    })
    .then((res) => res.data);
};

export const editGroupApi = (id, data) => {
  return api
    .post(
      `${baseUrl}/groupMngt`,
      { data },
      {
        params: { id: id },
      }
    )
    .then((res) => res.data);
};
