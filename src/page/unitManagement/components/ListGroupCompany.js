import React, { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import MultiUserIcon from "../../../common/icons/MultiUserIcon";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    padding: "16px 20px",
    boxShadow: "0 0 10px 0 rgba(117,115,115,0.16)",
    borderRadius: 8,
    // flexShrink: 0,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  list: {
    flex: 1,
    overflowY: "auto",
    marginTop: 12,
  },
  listItemBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0, // Important to prevent horizontal scrolling
  },
  listItemSelected: {},
}));

const ListGroupCompany = ({ onChange }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (_, index) => {
    setSelectedIndex(index);
    onChange();
  };

  return (
    <Paper className={classes.root}>
      <TextField
        placeholder="Search by group, camera"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
      />
      <List
        component="ul"
        aria-label="main mailbox folders"
        disablePadding
        className={classes.list}
      >
        {[1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => {
          return (
            <Fragment key={index}>
              <ListItem
                component="li"
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
                style={{
                  ...(selectedIndex === index && {
                    backgroundColor: "#ec1b2e14",
                  }),
                }}
              >
                <Tooltip title="Delete">
                  <Box className={classes.listItemBox}>
                    <MultiUserIcon />
                    <Typography noWrap>
                      Trung tâm Mô hình mô phỏng - Khối 1
                    </Typography>
                  </Box>
                </Tooltip>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default ListGroupCompany;
