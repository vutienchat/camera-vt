import {
  Box,
  ClickAwayListener,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStylesModalCreate } from "./Modal/ModalCreateGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DropdownCustom from "./DropdownCustom";
import { UserTypes, userRoles } from "../../until/type";

const CreateUser = React.memo(
  ({
    onSearchTypes,
    userType,
    setUserType,
    userRole,
    setUserRole,
    setDataSubmit,
    onChangeDataSubmit,
  }) => {
    const classes = useStylesModalCreate();
    const [isUserType, setIsUserType] = useState(false);
    const [isUserRole, setIsUserRole] = useState(false);
    const [textSearch, setTextSearch] = useState("");

    const handleSelectUserType = (value) => {
      setUserType(value);
      setIsUserType(false);
      setTextSearch("");
      onChangeDataSubmit(value.Id, "userType");
    };

    const handleSelectUserRole = (value) => {
      setUserRole(value);
      setIsUserRole(false);
      setTextSearch("");
      onChangeDataSubmit(value.Id, "role");
    };
    return (
      <React.Fragment>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              User Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => onChangeDataSubmit(e.target.value, "userName")}
            />
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => onChangeDataSubmit(e.target.value, "password")}
            />
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              Role <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                setIsUserRole(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() => setIsUserRole((prev) => !prev)}
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {userRole ? (
                      <span>{userRoles[userRole.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon />
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
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              Repeat Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) =>
                onChangeDataSubmit(e.target.value, "repeatPassword")
              }
            />
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              User Type <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                setIsUserType(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() => setIsUserType((prev) => !prev)}
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {userType ? (
                      <span>{UserTypes[userType.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon />
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
          </Box>
        </Box>
      </React.Fragment>
    );
  }
);

export default CreateUser;
