import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import CloseIcon from "@material-ui/icons/Close";
import { ReloadIcon } from "../../../common/icons/ReloadIcon";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/keys";
import { SettingIcon } from "../Icons";
import CustomModal from "../../../common/CustomModal";
import SettingModal from "../Modals/SettingModal";
import { TrafficContext } from "../TrafficContent";

const TableFilter = () => {
  const queryClient = useQueryClient();
  const classes = useTableFilterStyle();
  const { checkedItemList } = useContext(TrafficContext);

  const [textSearch, setTextSearch] = useState("");
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const handleReloadDataTable = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TRAFFIC_LIST]);
  };

  const handleChangeKeyword = () => {};

  const handleResetTextSearch = () => {};

  return (
    <Box className={classes.root}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Biển số xe"
        variant="outlined"
        name="keyword"
        value={textSearch}
        onChange={handleChangeKeyword}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon width={20} height={20} color="#EC1B2E" />
            </InputAdornment>
          ),
          endAdornment:
            textSearch.length > 0 ? (
              <InputAdornment position="end">
                <Box
                  component="div"
                  display="flex"
                  alignContent="center"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleResetTextSearch}
                >
                  <CloseIcon />
                </Box>
              </InputAdornment>
            ) : null,
        }}
      />
      {checkedItemList.length > 0 && (
        <React.Fragment>
          <Button
            className={classes.btnDropdown}
            variant="outlined"
            style={{
              border: "1px solid rgba(24, 106, 59, 1)",
            }}
          >
            <Typography
              style={{ color: "rgba(24, 106, 59, 1)", fontWeight: 700 }}
            >
              Gửi duyệt không lỗi
            </Typography>
          </Button>
        </React.Fragment>
      )}
      <Button className={classes.btnDropdown}>
        <Typography>Xuất danh sách</Typography>
      </Button>
      <Box className={classes.icon} onClick={handleReloadDataTable}>
        <ReloadIcon width={16} height={16} color="#000" />
      </Box>
      <Box className={classes.icon} onClick={() => setIsOpenSettingModal(true)}>
        <SettingIcon width={16} height={16} color="#000" />
      </Box>
      {isOpenSettingModal && (
        <CustomModal
          isOpen={isOpenSettingModal}
          handleClose={() => setIsOpenSettingModal(false)}
          title="Thông tin tuỳ chỉnh"
        >
          <SettingModal />
        </CustomModal>
      )}
    </Box>
  );
};

const useTableFilterStyle = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    marginTop: "10px",
    gap: "10px",
  },
  content: {
    padding: "10px",
    display: "flex",
    gap: "20px",
    alignContent: "center",
  },
  searchContent: {
    flex: 1,
  },
  actionsContent: {
    display: "flex",
    gap: "10px",
    alignContent: "center",
  },
  icon: {
    width: "40px",
    height: "40px",
    display: "flex",
    border: "1px solid #939393",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDropdown: {
    width: "auto",
    background: "#fff",
    border: "1px solid #939393",
    height: "40px",
    borderRadius: "4px",
    textTransform: "unset",
    cursor: "pointer",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#939393",
      width: "100%",
      padding: "0px 15px",
    },
  },
});

export default TableFilter;
