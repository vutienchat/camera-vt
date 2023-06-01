import { Box, Button } from "@material-ui/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { HeaderAction } from "../../../component/HeaderAction";
import { ModalDetailUser } from "../../../component/modal/ModalDetailUser";
import { ModalImport } from "../../../component/modal/ModalImport";

export const Customer = () => {
  const [openModalDetailUser, setOpenModalDetailUser] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [dataSend, setDataSend] = useState({});
  const [userId, setUserId] = useState(null);
  const handeModalDetailUser = (id) => {
    setOpenModalDetailUser(true);
    setUserId(id);
  };

  const handleInportData = (filePath, fileData) => {
    console.log({ filePath, fileData });
  };

  const { data } = useQuery(["customers"], async () => {
    const res = await axios.get("http://localhost:3004/customer");
    return res;
  });

  console.log(data);
  const handeChangeSubmit = (e) => {
    // console.log({ name: e.target.name, value: e.target.value });
    setDataSend({ ...dataSend, [e.target.name]: e.target.value });
  };
  const reload = () => {};

  return (
    <>
      <HeaderAction
        dataSend={dataSend}
        setDataSend={setDataSend}
        handeChangeSubmit={handeChangeSubmit}
        reload={reload}
      />
      <Box>Customer List</Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handeModalDetailUser(1);
        }}
      >
        Detail user
      </Button>
      <Button variant="contained" color="primary" onClick={setOpenModalImport}>
        Import Customer
      </Button>

      {openModalDetailUser && (
        <ModalDetailUser
          userId={userId}
          openModalDetailUser={openModalDetailUser}
          setOpenModalDetailUser={setOpenModalDetailUser}
        />
      )}

      <ModalImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        handleInportData={handleInportData}
      />
    </>
  );
};
