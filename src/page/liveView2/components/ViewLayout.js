import React, { useContext, useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import VideocamIcon from "@material-ui/icons/Videocam";
import { defaultData } from "../../../component/liveView/@type";
import { LiveView2Context } from "..";
import ModalTextBox from "../../../component/modal/ModalTextBox";
import { ModalDeleteTask } from "../../../component/modal";
import BasePopper from "./BasePopper";
import MultiSelect from "./MuiltiSelect";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: 40,
  },
}));

const listLayout = Array.from(Array(4)).map((_, idx) => ({
  id: `${idx}_new`,
  name: `layout ${idx}`,
  userId: "user id người tạo",
  userNameShare: "tên người chia sẻ",
  grid: defaultData.map((it) => ({ ...it, i: `${it.i}_${idx}` })),
  countDuplicate: 0,
  idLayoutShare: "id layout Share",
  idLayoutDuplicate: "id layout Duplicate",
  createAt: "date",
  lastModified: "date",
  label: `layout ${idx}`,
}));

const ViewLayout = React.memo(() => {
  const { setListAdd, listAdd, layoutActive } = useContext(LiveView2Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElCam, setAnchorElCam] = React.useState(null);
  const [dataListLayout, setDataListLayout] = React.useState([...listLayout]);
  const [layoutIndex, setLayoutIndex] = useState(null);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [camIndex, setCamIndex] = useState(null);
  const [startIdx, setStartIdx] = useState(null);
  const openListOption = Boolean(anchorEl);
  const isOpenOptionCam = Boolean(anchorElCam);

  function searchLayoutByNameOrI(listLayout, search) {
    const searchLowerCase = search.toLowerCase();

    const filteredLayouts = listLayout.map((layout) => {
      const isNameMatch = layout.name.toLowerCase().includes(searchLowerCase);
      const matchedGridItems = layout.grid.filter((gridItem) =>
        gridItem.i.toLowerCase().includes(searchLowerCase)
      );
      const filteredGrid = isNameMatch ? layout.grid : matchedGridItems;

      return {
        ...layout,
        grid: filteredGrid,
      };
    });

    const finalFilteredLayouts = filteredLayouts.filter(
      (layout) =>
        layout.name.toLowerCase().includes(searchLowerCase) ||
        layout.grid.length > 0
    );

    return finalFilteredLayouts;
  }

  // Ví dụ sử dụng hàm searchLayoutByNameOrI
  const searchValue = "Cam 1"; // Giá trị cần tìm kiếm (có thể là name hoặc i)
  const searchResults = searchLayoutByNameOrI(listLayout, searchValue);

  console.log("Kết quả tìm kiếm:", searchResults);

  const handleRightClick = (event, layoutIndex) => {
    event.preventDefault();
    setLayoutIndex(layoutIndex);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleRightClickCam = (event, camIndex) => {
    event.preventDefault();
    setCamIndex(camIndex);
    setAnchorElCam(anchorEl ? null : event.currentTarget);
  };
  const handleDuplicate = (id) => {
    if (!id) return;
    const tempData = [...dataListLayout];
    const layoutIndex = tempData.findIndex((it) => it.id === id);
    const newId = Math.random() * 10;
    if (layoutIndex !== -1) {
      tempData.push({
        ...tempData[layoutIndex],
        label: `${tempData[layoutIndex].label} (${
          tempData[layoutIndex].countDuplicate + 1
        })`,
        id: newId,
      });

      tempData[layoutIndex] = {
        ...tempData[layoutIndex],
        countDuplicate: tempData[layoutIndex].countDuplicate + 1,
      };

      setDataListLayout(tempData);
    }
  };

  const handleDelete = (id) => {
    const temp = [...dataListLayout].filter((item) => item.id !== id);
    setDataListLayout(temp);
  };

  const handleRename = (id) => {
    const tempData = [...dataListLayout];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx === -1) return;
    tempData[taskIndx] = { ...layoutIndex };
    setDataListLayout([...tempData]);
  };

  const handleShareLayout = (id) => {};

  const handleItemClick = (item, event) => {
    let listDataSelect = [...listAdd];
    if (event.shiftKey) return;
    if (event.ctrlKey) {
      if (listDataSelect.map((it) => it.i).includes(item.i)) {
        listDataSelect = listDataSelect.filter((it) => it.i !== item.i);
      } else {
        listDataSelect.push(item);
      }

      handleChangeListAdd(listDataSelect);
    } else {
      handleChangeListAdd([item]);
    }
  };

  const handleChangeListAdd = (listData) => {
    setListAdd(listData);
    // setListLayout(listData);
    return;
  };

  const handleMouseDown = (index, event, listData) => {
    if (!listData) return;
    const tempData = [...listData];
    if (event.ctrlKey) return;
    if (event.shiftKey) {
      if (startIdx === null) {
        // If Shift is held and this is the first mouse click, set the first item selected

        if (index === -1) return;
        tempData[index] = { ...tempData[index], selected: true };
        setStartIdx(index);
        handleChangeListAdd(tempData.filter((it) => it.selected));
      } else {
        // If there is already a first item selected, selects all items from the first to the last item

        const listSelect = tempData
          .slice(startIdx, index + 1)
          .map((it) => ({ ...it, selected: true }));

        setStartIdx(null); // Resets the first selected item after selection is complete
        handleChangeListAdd(listSelect);
      }
    }
  };

  const handleRemoveCam = (idCam, idLayout) => {
    if (!idLayout || !idCam) return;
    const tempData = [...dataListLayout];
    const layoutIndex = tempData.findIndex((it) => it.id === idLayout);
    if (layoutIndex !== -1) {
      const tempLayoutIndex = { ...tempData[layoutIndex] };
      const newDataGrid = tempLayoutIndex.grid.filter((it) => it.i !== idCam);
      tempLayoutIndex.grid = newDataGrid;
      tempData[layoutIndex] = tempLayoutIndex;
    }
    setDataListLayout(tempData);
  };

  const listOptionLayout = [
    {
      label: "Duplicate",
      handleClickOption: () => {
        handleDuplicate(layoutIndex.id || null);
      },
    },
    {
      label: "Share Layout",
      handleClickOption: () => {
        setIsOpenShareModal(true);
      },
    },
    {
      label: "Delete",
      handleClickOption: () => {
        setIsShowModalDelete(true);
      },
    },
    {
      label: "Rename",
      handleClickOption: () => {
        setIsShowModalRename(true);
      },
    },
  ];

  const listOptionCam = [
    {
      label: "Remove from Layout",
      handleClickOption: () => {
        handleRemoveCam(camIndex.i, layoutIndex.id);
      },
    },
  ];

  return (
    <React.Fragment>
      <MultiSelect />
      <List>
        {dataListLayout.map((it) => (
          <ItemLayout
            key={it.id}
            layout={it}
            handleRightClick={handleRightClick}
            handleItemClick={handleItemClick}
            handleMouseDown={handleMouseDown}
            handleRightClickCam={handleRightClickCam}
            setLayoutIndex={setLayoutIndex}
          />
        ))}
      </List>
      {openListOption && (
        <BasePopper
          anchorEl={anchorEl}
          handleClose={() => {
            setAnchorElCam(null);
            setAnchorEl(null);
          }}
          open={openListOption}
          listOption={listOptionLayout}
        />
      )}
      {isOpenOptionCam && (
        <BasePopper
          anchorEl={anchorElCam}
          handleClose={() => {
            setAnchorElCam(null);
            setAnchorEl(null);
          }}
          open={isOpenOptionCam}
          listOption={listOptionCam}
        />
      )}
      {isOpenShareModal && (
        <ModalTextBox
          open={isOpenShareModal}
          handleClose={() => {
            setIsOpenShareModal(false);
          }}
          handleChangeText={handleShareLayout}
          layoutActive={layoutIndex}
          setLayoutActive={setLayoutIndex}
          title={"Share Layout"}
          field={"Username"}
          nameButton={"SHARE"}
        />
      )}
      {isShowModalRename && (
        <ModalTextBox
          open={isShowModalRename}
          handleClose={() => {
            setIsShowModalRename(false);
          }}
          handleChangeText={handleRename}
          layoutActive={layoutIndex}
          setLayoutActive={setLayoutIndex}
          title={"Rename Layout"}
          field={"Rename Layout"}
          nameButton={"RENAME"}
        />
      )}
      {isShowModalDelete && (
        <ModalDeleteTask
          open={isShowModalDelete}
          handleClose={() => {
            setIsShowModalDelete(false);
          }}
          handleDelete={handleDelete}
          layoutActive={layoutIndex}
        />
      )}
    </React.Fragment>
  );
});

const ItemLayout = ({
  layout,
  handleRightClick,
  handleItemClick,
  handleMouseDown,
  handleRightClickCam,
  setLayoutIndex,
}) => {
  const {
    setLayoutActive,
    setListLayoutActive,
    listAdd,
    layoutActive,
    // handleMouseDown,
    isDragItem,
  } = useContext(LiveView2Context);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDoubleClick = (layoutLive) => {
    setLayoutActive(layoutLive);
    setListLayoutActive((prev) => {
      const tempData = [...prev];
      const layoutActive = tempData.findIndex((it) => it.id === layoutLive.id);

      if (layoutActive === -1) {
        tempData.push({ ...layoutLive });
      }
      return tempData;
    });
  };

  return (
    <React.Fragment>
      <ListItem>
        {open ? (
          <ArrowDropUpIcon
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={handleClick}
          />
        ) : (
          <ArrowDropDownIcon
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={handleClick}
          />
        )}

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            cursor: "pointer",
          }}
          onDoubleClick={() => handleDoubleClick(layout)}
          onContextMenu={(e) => handleRightClick(e, layout)}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <ViewComfyIcon />
            </ListItemIcon>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
                {layout.label}
              </Typography>
              <Typography
                style={{
                  fontSize: 10,
                  color: "#777",
                }}
              >
                chia sẻ bởi Hieu
              </Typography>
            </Box>
          </Box>
          <Typography
            style={{
              fontSize: 11,
              color: "#777",
            }}
          >
            {layout.grid.length} cameras
          </Typography>
        </Box>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {layout.grid &&
            layout.grid.map((grid, index) => (
              <React.Fragment key={grid.i}>
                <ListItem
                  button
                  className={classes.nested}
                  onContextMenu={(e) => {
                    setLayoutIndex(layout);
                    handleRightClickCam(e, grid);
                  }}
                  style={{
                    background:
                      listAdd &&
                      listAdd.length &&
                      listAdd.map((it) => it.i).includes(grid.i)
                        ? "#f6f4f4"
                        : "",
                    marginBlock: 5,
                    textDecoration:
                      layoutActive &&
                      layoutActive.grid.map((it) => it.i).includes(grid.i)
                        ? "line-through"
                        : "",
                  }}
                  draggable={
                    isDragItem && listAdd && listAdd.length ? true : false
                  }
                  unselectable="on"
                  // this is a hack for firefox
                  // Firefox requires some kind of initialization
                  // which we can do by adding this attribute
                  // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
                  onClick={(e) => {
                    if (
                      layoutActive &&
                      layoutActive.grid.map((it) => it.i).includes(grid.i)
                    )
                      return;
                    handleItemClick(grid, e);
                  }}
                  onMouseDown={(e) => {
                    if (
                      layoutActive &&
                      layoutActive.grid.map((it) => it.i).includes(grid.i)
                    )
                      return;
                    handleMouseDown(index, e, layout.grid);
                  }}
                >
                  <ListItemIcon style={{ minWidth: 30 }}>
                    <VideocamIcon />
                  </ListItemIcon>
                  <ListItemText primary={grid.i} />
                </ListItem>
              </React.Fragment>
            ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default ViewLayout;
