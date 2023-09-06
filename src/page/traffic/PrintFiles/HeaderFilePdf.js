import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { sendingData } from "../../../utils/traffic";

const HeaderFilePdf = () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Grid xs={6} className={classes.rowSpan}>
        <Typography
          style={{ fontWeight: 600 }}
          className={classes.uppercaseText}
        >
          Công an {sendingData.provinceName}
        </Typography>
        <Typography
          style={{ fontWeight: 600 }}
          className={classes.uppercaseText}
        >
          Công an {sendingData.cityName}
        </Typography>
        <Grid className={classes.line}></Grid>
        <Grid>
          <Typography style={{ fontSize: 13 }}>
            Số: {sendingData.sendingNo}/PG/{sendingData.sendingCode}
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={6} className={classes.rowSpan}>
        <Typography
          style={{ fontWeight: 600 }}
          className={classes.uppercaseText}
        >
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Typography>
        <Typography style={{ fontSize: 14, fontWeight: 600 }}>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
        <Grid className={classes.line}></Grid>
        <Grid>
          <Typography style={{ fontSize: 13 }}>
            <span style={{ fontStyle: "italic" }}>{sendingData.province}</span>,
            ngày <span style={{ fontStyle: "italic" }}>{sendingData.day}</span>{" "}
            tháng{" "}
            <span style={{ fontStyle: "italic" }}>{sendingData.month}</span> năm{" "}
            <span style={{ fontStyle: "italic" }}>{sendingData.year}</span>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rowSpan: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  uppercaseText: {
    textTransform: "uppercase",
    fontSize: 16,
  },
  line: {
    width: 140,
    height: 1,
    backgroundColor: "#000",
    margin: "5px 0",
  },
});

export default HeaderFilePdf;
