import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { notiData } from "../../../utils/traffic";

const VehicleImagePdf = React.forwardRef((props, ref) => {
  const item = props.violationInfor || [];

  const classes = styles();
  return (
    <Grid className={classes.rowSpan} ref={ref}>
      <div style={{ margin: "0 40px" }}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <img
            src="./csgt.jpg"
            alt="Image"
            style={{ marginLeft: 60, width: 40, height: 50 }}
          />
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              marginRight: 60,
            }}
          >
            <Typography
              className={classes.uppercaseText}
              style={{ textAlign: "center", fontWeight: 600 }}
            >
              HỆ THỐNG GIÁM SÁT TRẬT TỰ
            </Typography>
            <Typography
              className={classes.uppercaseText}
              style={{ textAlign: "center", fontWeight: 600 }}
            >
              AN TOÀN GIAO THÔNG ĐƯỜNG BỘ BẰNG HÌNH ẢNH
            </Typography>
            <Grid
              style={{
                width: 180,
                height: 1,
                backgroundColor: "#000",
                marginTop: 10,
              }}
            ></Grid>
          </Grid>
        </Grid>
        <Typography
          style={{
            textAlign: "center",
            letterSpacing: 0.5,
            paddingVertical: 30,
            fontWeight: 600,
            margin: "40px 0 40px 0",
          }}
        >
          HÌNH ẢNH PHƯƠNG TIỆN VI PHẠM
        </Typography>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Vào hồi :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.violationDate?.substring(0, 8)} ngày{" "}
              {item?.violationDate?.substring(9, 18)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Địa điểm :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.location}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Hành vi vi phạm :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.statusEvent}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Biển số phương tiện vi phạm :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.description?.licencePlate}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Thiết bị phát hiện:
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.camName}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Đơn vị vận hành :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              Công an {notiData.cityName} - Công an {notiData.provinceName}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography style={{ letterSpacing: 0.5, width: 260 }}>
            - Toạ độ :
          </Typography>
          <Grid style={{ flex: 1 }}>
            <Typography style={{ letterSpacing: 0.5, fontWeight: 600 }}>
              {item?.lat} {item?.lng}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            width: "100%",
            marginTop: 20,
          }}
        >
          <Grid style={{ width: 150 }}>
            <Grid
              style={{ width: "100%", height: 200, backgroundColor: "#808080" }}
              // {item?.imageCrop}
            ></Grid>
            <Grid
              style={{
                width: "100%",
                backgroundColor: "#b3b3b3",
                marginTop: 5,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontSize: 8, textAlign: "center" }}>
                Ảnh chụp phương tiện
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ flex: 1 }}>
            <Grid
              style={{ width: "100%", height: 200, backgroundColor: "#808080" }}
              // {item?.imageFull}
            ></Grid>
            <Grid
              style={{
                padding: 5,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 3,
                backgroundColor: "#b3b3b3",
                marginTop: 5,
                height: 30,
              }}
            >
              <Typography
                style={{ fontSize: 8, textAlign: "center", width: 80 }}
              >
                Ảnh chụp màn hình
              </Typography>
              <Typography style={{ fontSize: 8, width: 230 }}>
                Nút giao Phạm Văn Đồng - đường tỉnh 363 (phường Hải Thành, quận
                Dương Kinh, thành phố Hải Phòng)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            width: "100%",
            marginTop: 10,
            marginBottom: 50,
          }}
        >
          <Grid style={{ width: 150 }}>
            <Grid
              style={{ width: "100%", height: 100, backgroundColor: "#808080" }}
              // {item?.imageDetail}
            ></Grid>
            <Grid
              style={{
                padding: 5,
                width: "100%",
                backgroundColor: "#b3b3b3",
                marginTop: 5,
              }}
            >
              <Typography style={{ fontSize: 8, textAlign: "center" }}>
                Ảnh chụp biển số
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ flex: 1 }}>
            <Grid style={{ width: "100%", height: 100 }}>
              <img
                src={{
                  uri: "https://maps.googleapis.com/maps/api/staticmap?center=21.0285,105.8542&zoom=16&size=600x400&key=AIzaSyDI3p_xqPNiCKgtK_yIDkXiq-BJ_aRNjpI&markers=color:red%7C21.0285,105.8542",
                }}
                alt="image Map"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
            <Grid
              style={{
                padding: 5,
                width: "100%",
                backgroundColor: "#b3b3b3",
                marginTop: 5,
              }}
            >
              <Typography style={{ fontSize: 8, textAlign: "center" }}>
                Bản đồ
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
});

const styles = makeStyles({
  rowSpan: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 130,
  },
  uppercaseText: {
    textTransform: "uppercase",
    fontSize: 15,
  },
  fontSmall: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  line: {
    width: 150,
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
    marginTop: 40,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 120,
    width: "100%",
    gap: 40,
  },
});
export default VehicleImagePdf;
