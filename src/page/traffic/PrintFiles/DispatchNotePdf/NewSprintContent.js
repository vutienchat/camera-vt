import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { sendingData } from "../../../../utils/traffic";

const NewSprintContent = () => {
  const classes = styles();
  return (
    <Grid className={classes.rowSpan}>
      <Typography className={classes.uppercaseText} style={{ fontWeight: 600 }}>
        Phiếu báo
      </Typography>
      <Typography>
        Kính gửi: Công an <span>{sendingData.cityName}</span> - Công an{" "}
        <span>{sendingData.provinceName}</span>
      </Typography>
      <Grid style={{ marginTop: 10 }}>
        <Grid>
          <Typography className={classes.textIndent} style={{ fontSize: 13 }}>
            Công an phường, xã, thị trấn:
            .....................................................................................................
            đã nhận được thông báo số: ................/PG/CATP, ngày .....
            tháng ..... năm và đã chuyển đến chủ phương tiện theo thông báo hoặc
            ...................................................................................................
          </Typography>
          <Typography className={classes.textIndent} style={{ fontSize: 13 }}>
            Vậy thông báo để cơ quan đã ra thông báo biết.
          </Typography>
        </Grid>
        <Grid className={classes.footer}>
          <Grid style={{ width: 200 }}>
            <Typography style={{ fontSize: 12, fontWeight: 600 }}>
              Nơi nhận
            </Typography>
            <Typography style={{ fontSize: 12 }}>- Như trên</Typography>
            <Typography style={{ fontSize: 12 }}>
              - Lưu: Hồ sơ vụ việc(CATP)
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Thủ trưởng đơn vị
            </Typography>
            <Typography style={{ fontSize: 14 }}>
              (Ký, ghi rõ họ tên và đóng dấu)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const styles = makeStyles({
  rowSpan: {
    display: "flex",
    marginTop: 10,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  uppercaseText: {
    textTransform: "uppercase",
    fontSize: 16,
  },
  line: {
    width: 250,
    height: 1,
    backgroundColor: "#000",
    margin: "5px 0 10px 0",
  },
  textIndent: {
    textIndent: "25px",
    wordWrap: "break-word",
  },
  footer: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    gap: 20,
  },
});
export default NewSprintContent;
