import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

import UpIcon from "../Icon/UpIcon";
import DropDownIcon from "../Icon/DropDownIcon";
import SearchBar from "./CommonSearchBar";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  btnDropdown: {
    position: "absolute",
    padding: "0 16px 0 24px",
    borderRadius: "4px",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "none",
    cursor: "pointer",
    color: "#222",
    fontWeight: 500,
    border: "1px solid rgba(0, 0, 0, 0.10)",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "normal",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    zIndex: 50,
    width: "280px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  listItem: {
    padding: "8px 12px 8px 16px",
    color: "#000000",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    // justifyContent: "space-between",
    gap: 15,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f6f4f5",
    },
  },
  isChecked: { backgroundColor: "#f6f4f5", "& p": { fontWeight: 600 } },
  menu: {
    "&::-webkit-scrollbar": {
      width: "5px",
      marginLeft: 4,
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  rowTrafficItem: {
    height: 60,
    "&:hover": { backgroundColor: "#fae2e4 !important" },
    "& .MuiTableCell-root": {
      borderBottom: "3px solid #ffffff",
      borderTop: "3px solid #ffffff",
    },
  },
  tableCellCustom: {
    "& .MuiTypography-root": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "rgb(34,34,34)" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
}));
const SelectContainTable = ({
  width,
  btnText,
  list,
  positionDropDown = "left",
  searchBarType,
  dropdownWidth,
  tableHeader,
  selectedStoragePlan,
  handleClickColumns,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [listFilter, setListFilter] = useState(list);

  useEffect(() => {
    if (textSearch) {
      setListFilter(
        [...list].filter((item) => item.name.includes(textSearch.trim()))
      );
    } else {
      setListFilter(list);
    }
  }, [textSearch, list]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  console.log("textSearch", textSearch);

  return (
    <Box style={{ minWidth: width || "auto" }} key={searchBarType}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            type="button"
            onClick={handleClick}
            variant="outlined"
            className={classes.btnDropdown}
            endIcon={
              isOpen ? (
                <UpIcon color="#939393" />
              ) : (
                <DropDownIcon color="#939393" />
              )
            }
          >
            {selectedStoragePlan.name ? (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <Tooltip title={selectedStoragePlan.name}>
                  <Typography style={{ maxWidth: 78, width: 78 }}>
                    {selectedStoragePlan.name}
                  </Typography>
                </Tooltip>
                <Tooltip title={selectedStoragePlan.period}>
                  <Typography style={{ maxWidth: 48, width: 48 }}>
                    {selectedStoragePlan.period}
                  </Typography>
                </Tooltip>
                <Tooltip title={selectedStoragePlan.expiration}>
                  <Typography style={{ maxWidth: 108, width: 108 }}>
                    {selectedStoragePlan.expiration}
                  </Typography>
                </Tooltip>
              </Box>
            ) : (
              <Typography>{btnText}</Typography>
            )}
          </Button>
          {isOpen ? (
            <Box
              className={classes.dropdown}
              style={{ [positionDropDown]: 0, width: dropdownWidth || "280px" }}
            >
              <SearchBar
                searchKey={textSearch}
                searchBarType={searchBarType}
                setSearchKey={setTextSearch}
              />
              <Box
                style={{
                  marginTop: 10,
                  maxHeight: "280px",
                  overflowY: "auto",
                }}
                className={classes.menu}
              >
                <TableContainer component={Box}>
                  <Box
                    className={classes.menu}
                    style={{
                      maxHeight: "280px",
                      height: "280px",
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Table aria-label="simple table" stickyHeader>
                      <TableHead
                        style={{
                          height: "40px",
                          texWrap: "nowrap",
                        }}
                      >
                        <TableRow>
                          {tableHeader.map((header) => {
                            return (
                              <TableCell
                                key={header.field}
                                style={{
                                  ...header.customStyles,
                                  width: header.width,
                                  padding: 10,
                                  borderBottom: 0,
                                }}
                              >
                                <Typography
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    lineHeight: "normal",
                                    letterSpacing: "normal",
                                    textAlign: "left",
                                  }}
                                >
                                  {header.name}
                                </Typography>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listFilter.map((dataBody) => {
                          const isChecked =
                            dataBody.id === selectedStoragePlan.id;
                          return (
                            <TableRow
                              key={dataBody.id}
                              style={{
                                backgroundColor: isChecked
                                  ? "#fae2e4"
                                  : "transparent",
                              }}
                              className={classes.rowTrafficItem}
                            >
                              {tableHeader.map((head) => {
                                const {
                                  field,
                                  component,
                                  customStyles,
                                  width,
                                } = head;
                                return (
                                  <TableCell
                                    key={field}
                                    style={{
                                      ...customStyles,
                                      width,
                                      cursor: handleClickColumns
                                        ? "pointer"
                                        : "auto",
                                      backgroundColor:
                                        " rgba(34, 34, 34, 0.05)",
                                      borderTopLeftRadius:
                                        head.name === "Name" && "15px",
                                      borderBottomLeftRadius:
                                        head.name === "Name" && "15px",
                                      borderTopRightRadius:
                                        head.name === "Expiration" && "15px",
                                      borderBottomRightRadius:
                                        head.name === "Expiration" && "15px",
                                      borderRight:
                                        head.name === "Expiration" &&
                                        "5px solid #ffffff",
                                      borderLeft:
                                        head.name === "Name" &&
                                        "5px solid #ffffff",
                                    }}
                                    className={classes.tableCellCustom}
                                    onClick={() => {
                                      if (handleClickColumns) {
                                        handleClickColumns(dataBody);
                                      }
                                    }}
                                  >
                                    {component ? (
                                      component(dataBody)
                                    ) : (
                                      <Tooltip title={dataBody[field] || ""}>
                                        <Typography
                                          className={classes.text}
                                          style={{ width }}
                                        >
                                          {dataBody[field]}
                                        </Typography>
                                      </Tooltip>
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                </TableContainer>
              </Box>
            </Box>
          ) : null}
        </div>
      </ClickAwayListener>
    </Box>
  );
};

export default SelectContainTable;
