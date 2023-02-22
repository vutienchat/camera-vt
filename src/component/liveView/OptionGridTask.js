import React, { memo } from "react";
import { Box, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  buttonGrid: {
    cursor: "pointer",
    "&:hover": { opacity: 0.4 },
  },
  numberGrid: {
    padding: 0,
    fontWeight: "bold",
    fontSize: "21px",
    minWidth: "max-content",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "0 4px",
    marginRight: "8px",
    height: "32px",
  },
});

const OptionGridTask = memo((props) => {
  const classes = useStyles();

  const { onClickCustomSize, typeOption } = props;
  return (
    <Box style={{ display: "flex" }}>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(1);
        }}
        className={classes.buttonGrid}
      >
        <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(2);
        }}
        className={classes.buttonGrid}
      >
        <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(3);
        }}
        className={classes.buttonGrid}
      >
        <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(4);
        }}
        className={classes.buttonGrid}
      >
        <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
      </Box>
      {typeOption === "model" && (
        <Box style={{ display: "flex" }}>
          <Button
            className={classes.numberGrid}
            onClick={(e) => {
              e.preventDefault();
              onClickCustomSize(5);
            }}
          >
            25
          </Button>
          <Button
            className={classes.numberGrid}
            onClick={(e) => {
              e.preventDefault();
              onClickCustomSize(6);
            }}
          >
            36
          </Button>
        </Box>
      )}
    </Box>
  );
});

export default OptionGridTask;
