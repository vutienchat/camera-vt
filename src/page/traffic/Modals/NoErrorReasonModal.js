import React, { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";

const NoErrorReasonModal = ({ list, handleSelect }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Box className={classes.content}>
      <Typography style={{ fontWeight: 500 }}>
        Lý do vi phạm không lỗi <span style={{ color: "#dd3d4b" }}>*</span>
      </Typography>
      <FormControl
        variant="outlined"
        size="small"
        style={{ minWidth: "500px", height: "48px" }}
      >
        <Select
          open={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleSelect}
          defaultValue={list[0].value}
          fullWidth
        >
          {list.map((item) => {
            return (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const useStyles = makeStyles({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
});

export default NoErrorReasonModal;
