import { makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";

const Thumbnail = ({ data }) => {
  const classes = styles();
  return <React.Fragment></React.Fragment>;
};

const styles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  image: {
    width: 85,
    height: 70,
    borderRadius: 2,
  },
});

export default Thumbnail;
