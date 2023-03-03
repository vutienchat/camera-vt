import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  ListItem,
  Collapse,
  List,
} from "@material-ui/core";
import { getGroupTree } from "../liveView/javascript";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const getAllParenNode = (listChildren, nodeTree) => {
  return listChildren
    .reduce((listTMP, nodeChildren) => {
      return [...listTMP, { ...nodeChildren }].concat(
        nodeChildren.asserts.map((parentId) =>
          nodeTree.find((node) => node.id === parentId)
        )
      );
    }, [])
    .reduce((nodeLIstTmp, node) => {
      if (!node || nodeLIstTmp.some((nodeTmp) => nodeTmp.id === node.id)) {
        return [...nodeLIstTmp];
      }
      return [...nodeLIstTmp, node];
    }, []);
};

const MapData = React.memo(({ data, setAddressMove, addressMove }) => {
  return (
    <Box>
      <ListItem
        button
        key={data.id}
        style={{
          width: "100%",
          display: "block",
          backgroundColor:
            addressMove.id === data.id ? "#ff006f0f" : "transparent",
        }}
      >
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setAddressMove(data)}
        >
          {data.nodeChildren && data.nodeChildren.length !== 0 && (
            <Box>
              {true ? (
                <ArrowDropDownIcon fontSize="large" />
              ) : (
                <ArrowRightIcon fontSize="large" />
              )}
            </Box>
          )}
          <Typography>{data.label}</Typography>
        </Box>
      </ListItem>
      {data.nodeChildren && data.nodeChildren.length !== 0 && (
        <Box style={{ paddingLeft: 20 }}>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List style={{ width: "100%" }}>
              {data.nodeChildren && data.nodeChildren.length !== 0
                ? data.nodeChildren.map((item) => {
                    return (
                      <MapData
                        data={item}
                        key={item.id}
                        setAddressMove={setAddressMove}
                        addressMove={addressMove}
                      />
                    );
                  })
                : null}
            </List>
          </Collapse>
        </Box>
      )}
    </Box>
  );
});

const ModalMove = React.memo(
  ({ handleClose, handleMoveTask, objectSelectMove, groupData }) => {
    const [valueSearch, setValueSearch] = useState("");
    const [addressMove, setAddressMove] = useState({});

    const dataSearch = useMemo(() => {
      let groupListSelect = [...groupData];

      if (objectSelectMove.typeDisplay === "") {
        groupListSelect = groupListSelect.filter(
          (groupItem) => groupItem.id !== objectSelectMove.id
        );
      }

      const nodeSearch = [...groupListSelect].filter(
        (groupItem) =>
          groupItem.label
            .toLowerCase()
            .indexOf(`${valueSearch.toLocaleLowerCase()}`) !== -1
      );
      const nodeSearchFetch = getAllParenNode(nodeSearch, groupListSelect);

      const parseData = [...nodeSearchFetch].reduce((abc, nodeTree) => {
        if (nodeTree.parentId === "") {
          return [
            ...abc,
            {
              ...getGroupTree(nodeTree, [...nodeSearchFetch, []]),
            },
          ];
        }
        return [...abc];
      }, []);
      return parseData;
    }, [valueSearch, objectSelectMove]);

    const handleMoveTaskGroup = useCallback((objectSelect, addMove) => {
      console.log(objectSelect);
      console.log(addMove);
    }, []);

    return (
      <Dialog open={true} onClose={handleClose}>
        <Box style={{ width: 400 }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "solid 2px #c9c9c9",
              marginInline: "24px",
              padding: "20px 0 10px 0",
            }}
          >
            <Typography style={{ fontWeight: 800 }}>Move Group</Typography>
            <Typography
              style={{ fontWeight: 600, cursor: "pointer" }}
              onClick={handleClose}
            >
              X
            </Typography>
          </Box>
          <DialogContent>
            <Box>
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  style={{ background: "#fff" }}
                  size="small"
                  placeholder={"Search by Site Name"}
                  value={valueSearch}
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => setValueSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          fontSize={"small"}
                          style={{ color: "red" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Box
                  style={{
                    maxHeight: "300px",
                    overflow: "auto",
                  }}
                >
                  <List style={{ width: "100%" }}>
                    {dataSearch.map((item) => {
                      return (
                        <MapData
                          data={item}
                          key={item.id}
                          setAddressMove={setAddressMove}
                          addressMove={addressMove}
                        />
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0 10px 0",
            }}
          >
            <Button
              onClick={() => handleMoveTaskGroup(objectSelectMove, addressMove)}
              style={{
                width: "120px",
                height: "35px",
                background: "#dd3d4b",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              style={{
                width: "120px",
                height: "35px",
                background: "#fff",
                color: "#333",
                fontWeight: "600",
                border: "solid 1px ",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    );
  }
);

export default ModalMove;
