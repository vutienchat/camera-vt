import React, { memo } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import GridX1 from "../../asset/image/Mask Group 724.png";
import GridX2 from "../../asset/image/Mask Group 725.png";
import GridX3 from "../../asset/image/Group 8852.png";
import GridX4 from "../../asset/image/Group 8853.png";

const useStyles = makeStyles({
  buttonGrid: {
    cursor: "pointer",
    marginRight: "8px",
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

  const { onClickCustomSize = () => null, typeOption } = props;
  return (
    <Box style={{ display: "flex" }}>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(1);
        }}
        className={classes.buttonGrid}
      >
        <img src={GridX1} alt="GridX1" style={{ width: 24 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(2);
        }}
        className={classes.buttonGrid}
      >
        <img src={GridX2} alt="GridX2" style={{ width: 24 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(3);
        }}
        className={classes.buttonGrid}
      >
        <img src={GridX3} alt="GridX3" style={{ width: 24 }} />
      </Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          onClickCustomSize(4);
        }}
        className={classes.buttonGrid}
      >
        <img src={GridX4} alt="GridX4" style={{ width: 24 }} />
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
