import {
  Box,
  Collapse,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles({
  container: {
    boxShadow: "0 0 10px 0 rgba(0,0,0,0,1)",
    fontSize: 14,
    borderRadius: "4px",
    padding: 16,
    background: "#fff",
    color: "#333",
    position: "absolute",
    zIndex: 1,
  },
  itemGroupSearch: {
    borderRadius: "4px ",
    paddingRight: "10px",
    "&.MuiListItem-button:hover": {
      "&:hover": {
        background: "#f6f4f5",
      },
    },
  },
});

const MapData = React.memo(({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = (e) => {
    setOpen(!open);
    e.stopPropagation();
  };
  return (
    <Box>
      <ListItem
        button
        key={data.id}
        style={{ width: "100%", display: "block" }}
      >
        <Box
          style={{ width: "100%", display: "flex", alignItems: "center" }}
          onClick={handleClick}
        >
          {data.nodeChildren && data.nodeChildren.length !== 0 && (
            <Box>
              {open ? (
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List style={{ width: "100%" }}>
              {data.nodeChildren && data.nodeChildren.length !== 0
                ? data.nodeChildren.map((item) => {
                    return <MapData data={item} key={item.id} />;
                  })
                : null}
            </List>
          </Collapse>
        </Box>
      )}
    </Box>
  );
});

const RenderDataGroup = React.memo(({ data, width }) => {
  const classes = useStyles();
  const [valueSearch, setValueSearch] = useState("");

  return (
    <Box className={classes.container} style={{ width: width || 300 }}>
      <Box style={{ marginBottom: "10px" }}>
        <TextField
          fullWidth
          variant="outlined"
          style={{ background: "#fff" }}
          size="small"
          placeholder={"Search"}
          value={valueSearch}
          inputProps={{ maxLength: 50 }}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize={"small"} style={{ color: "#939393" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {data && data.length && (
        <Box
          style={{
            maxHeight: "300px",
            overflow: "auto",
            paddingRight: "16px",
            marginRight: "-10px",
          }}
        >
          <List style={{ width: "100%" }}>
            {data.map((item) => {
              return <MapData data={item} key={item.id} />;
            })}
          </List>
        </Box>
      )}
    </Box>
  );
});

export default RenderDataGroup;
