import {
  Box,
  ClickAwayListener,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStylesModalCreate } from "./ModalCreateGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DropdownCustom from "../DropdownCustom";
import { UserTypes, userRoles } from "../../../until/type";
import { onSearchTypes } from "../../../until/common";

const FormUser = React.memo(
  ({
    userType,
    setUserType,
    userRole,
    setUserRole,
    onChangeDataSubmit,
    onBlurUserName,
    onBlurPassWord,
    onBlurRepeatPassword,
    messErr,
    onBlurUserRole,
    onBlurUserType,
    dataSubmit,
  }) => {
    const classes = useStylesModalCreate();
    const [isUserType, setIsUserType] = useState(false);
    const [isUserRole, setIsUserRole] = useState(false);
    const [textSearch, setTextSearch] = useState("");

    const handleSelectUserType = (value) => {
      setUserType(value);
      setIsUserType(false);
      setTextSearch("");
      onChangeDataSubmit(value.id, "userType");
    };

    const handleSelectUserRole = (value) => {
      setUserRole(value);
      setIsUserRole(false);
      setTextSearch("");
      onChangeDataSubmit(value.id, "role");
    };
    return (
      <React.Fragment>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              User Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => {
                onBlurUserName(e.target.value);
                onChangeDataSubmit(e.target.value, "userName");
              }}
              onBlur={(e) => onBlurUserName(e.target.value)}
              error={messErr.userNameErr !== ""}
            />
            {messErr.userNameErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.userNameErr}
              </span>
            )}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              type="password"
              onChange={(e) => {
                onBlurPassWord(e.target.value);
                onChangeDataSubmit(e.target.value, "password");
              }}
              onBlur={(e) => onBlurPassWord(e.target.value)}
              error={messErr.passwordErr !== ""}
            />
            {messErr.passwordErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.passwordErr}
              </span>
            )}
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Role <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                if (isUserRole) onBlurUserRole(dataSubmit.userRole);
                setIsUserRole(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() =>
                    setIsUserRole((prev) => {
                      if (prev) onBlurUserRole(dataSubmit.userRole);
                      return !prev;
                    })
                  }
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {userRole ? (
                      <span>{userRoles[userRole.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon
                    style={{ color: "#939393", fontSize: "30px" }}
                  />
                </button>
                {isUserRole && (
                  <DropdownCustom
                    listData={onSearchTypes(
                      Object.values(userRoles),
                      textSearch
                    )}
                    setTypeSelected={handleSelectUserRole}
                    setTextSearch={setTextSearch}
                    typeSelected={userRole}
                    textSearch={textSearch}
                  />
                )}
              </Box>
            </ClickAwayListener>
            {messErr.userRoleErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.userRoleErr}
              </span>
            )}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Repeat Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              type="password"
              onChange={(e) => {
                onBlurRepeatPassword(e.target.value);
                onChangeDataSubmit(e.target.value, "repeatPassword");
              }}
              onBlur={(e) => onBlurRepeatPassword(e.target.value)}
              error={messErr.repeatPasswordErr !== ""}
            />
            {messErr.repeatPasswordErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.repeatPasswordErr}
              </span>
            )}
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              User Type <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                if (isUserType) onBlurUserType(dataSubmit.userType);
                setIsUserType(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() =>
                    setIsUserType((prev) => {
                      if (prev) onBlurUserType(dataSubmit.userType);
                      return !prev;
                    })
                  }
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {userType ? (
                      <span>{UserTypes[userType.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon
                    style={{ color: "#939393", fontSize: "30px" }}
                  />
                </button>
                {isUserType && (
                  <DropdownCustom
                    listData={onSearchTypes(
                      Object.values(UserTypes),
                      textSearch
                    )}
                    setTypeSelected={handleSelectUserType}
                    setTextSearch={setTextSearch}
                    typeSelected={userType}
                    textSearch={textSearch}
                  />
                )}
              </Box>
            </ClickAwayListener>
            {messErr.userTypeErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.userTypeErr}
              </span>
            )}
          </Box>
        </Box>
      </React.Fragment>
    );
  }
);

export default FormUser;
