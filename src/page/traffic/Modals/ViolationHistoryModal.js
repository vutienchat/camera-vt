import { Box, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import useTrafficData from "../../../hooks/api/useTrafficData";
import {
  colorStatusErrEvent,
  statusErrEvent,
  typeErrEvent,
} from "../../../utils/traffic";
import TableContent from "../Table/TableContent";

export const columnsTrafficData = [
  {
    field: "id",
    name: "#",
    width: 150,
  },
  {
    field: "numberPlate",
    name: "Biển số xe",
    component: (data) => {
      return <Typography>{data.description.licencePlate}</Typography>;
    },
  },
  {
    field: "typeError",
    name: "Lỗi vi phạm",
    component: (data) => {
      return <Typography>{typeErrEvent[data.typeError]}</Typography>;
    },
  },
  {
    field: "createDate",
    name: "Thời gian vi phạm",
  },
  {
    field: "location",
    name: "Vị trí",
  },
  {
    field: "camName",
    name: "Camera",
  },
  {
    field: "status",
    name: "Trạng Thái",
    component: (data) => {
      return (
        <Box
          style={{
            backgroundColor:
              colorStatusErrEvent[data.statusEvent].backgroundColor,
            width: "fit-content",
            padding: "1px 8px 1px 8px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            "& p": {
              lineHeight: "21.4px",
            },
          }}
        >
          <Box
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "100px",
              backgroundColor: colorStatusErrEvent[data.statusEvent].color,
            }}
          ></Box>
          <Typography
            style={{
              color: colorStatusErrEvent[data.statusEvent].color,
            }}
          >
            {statusErrEvent[data.statusEvent]}
          </Typography>
        </Box>
      );
    },
  },
];

const ViolationHistoryModal = () => {
  const {
    data: trafficList,
    isLoading: isTrafficLoading,
    isFetching: isTrafficFetching,
  } = useTrafficData();

  const [checkedItemList, setCheckedItemList] = useState([]);

  const handleCheckData = (data) => {
    setCheckedItemList(data);
  };

  return (
    <Fragment>
      <TableContent
        isLoading={isTrafficLoading || isTrafficFetching}
        tableData={trafficList}
        tableHeader={columnsTrafficData}
        handleCheckData={handleCheckData}
        checkedItems={checkedItemList}
      />
    </Fragment>
  );
};

export default ViolationHistoryModal;
