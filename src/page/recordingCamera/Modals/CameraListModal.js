import { Box, Grid, makeStyles } from "@material-ui/core";
import { cameraStorageData, serverArr } from "../../../utils/traffic";
import { FormProvider, useForm } from "react-hook-form";
import BaseSearchForm from "../../traffic/component/BaseSearchForm";
import BaseButton from "../../traffic/component/BaseButton";
import SelectMultiple from "../../../component/SelectMultiple";
import TableContent from "../../traffic/Table/TableContent";
import { useContext, useState } from "react";
import useCameraData from "../../../hooks/api/useCameraData";
import  { TrafficContext } from "../../traffic/TrafficContent";
import { useMemo } from "react";

const CameraListModal = () => {
  const methods = useForm({});
  const { data: cameraList } = useCameraData();
  const [checkedItemList, setCheckedItemList] = useState([]);

  const {
    register,
    control,
    formState: { errors },
  } = methods;
  const [pagination, setPagination] = useState({
    page: 0,
    rowPerPage: 9,
    length: 0,
  });
  const handleChangePagination = (pag) => {
    setPagination({
      page: pag.page,
      rowPerPage: pag.rowPerPage,
    });
  };

  const cameraDataShow = useMemo(()=>{
    if(!cameraList) return [];
    return {
      data: cameraList.slice(
        pagination.page * (pagination.rowPerPage + 1),
        pagination.page * (pagination.rowPerPage + 1) + pagination.rowPerPage
      ),
    }
  }, [cameraList,  pagination])
  const classes = style();
  return (
    <Box className={classes.root}>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BaseSearchForm placeholder={"Search by device name, device ID"} />
          </Grid>
          {serverArr.map((item) => {
            return (
              <Grid item xs={2}>
                <SelectMultiple
                  key={item.key}
                  placeholderContent={item.placeholderContent}
                  list={item.list}
                  btnText={item.btnText}
                />
              </Grid>
            );
          })}
          <Grid item xs={2}>
            <BaseButton content={"Export Data"} />
          </Grid>
        </Grid>
        <Box className={classes.table}>
          <TableContent
            tableHeader={cameraStorageData}
            pagination={{
              page: pagination.page,
              rowPerPage: pagination.rowPerPage,
              length: cameraList ? cameraList.length : 0,
            }}
            tableData={cameraDataShow.data}
            checkedItems={checkedItemList}
            handleChangePagination={handleChangePagination}
          />
        </Box>
      </FormProvider>
    </Box>
  );
};

const style = makeStyles({
  root: {
    padding: "10px 0 20px 0",
    width: 1141,
    borderRadius: 10,
    backgroundColor: "white",
    "& .MuiInputBase-root": { height: "48px" },
  },
  rowWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  table: {
    padding: "20px 0",
  },
});

export default CameraListModal;
