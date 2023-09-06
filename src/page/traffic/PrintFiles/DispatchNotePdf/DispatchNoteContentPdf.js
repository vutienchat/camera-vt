import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { sendingData } from "../../../../utils/traffic";
import SignViewPdf from "../SignViewPdf";

const DispatchNoteContent = () => {
  const classes = style();
  return (
    <Grid className={classes.rowSpan}>
      <Typography className={classes.uppercaseText} style={{ fontWeight: 600 }}>
        Phiếu gửi
      </Typography>
      <Typography style={{ fontWeight: 600 }}>
        Thông báo vi phạm hành chính về trật tự an toàn giao thông đường bộ
      </Typography>
      <Grid className={classes.line}></Grid>
      <Typography>
        Kính gửi: Công an (phường, xã, thị trấn):{" "}
        {sendingData.policeHeadquarters}.
      </Typography>
      <Grid style={{ marginTop: 5 }}>
        <Typography className={classes.textIndent}>
          Công an {sendingData.cityName} - Công an {sendingData.provinceName}{" "}
          thực hiện Thông báo vi phạm hành chính về TTATGT đường bộ số:{" "}
          {sendingData.sendingNo}/{sendingData.sendingCode}, ngày{" "}
          {sendingData.day} tháng {sendingData.month} năm {sendingData.year} .
        </Typography>
        <Grid style={{ marginTop: 10 }}>
          <Typography className={classes.textIndent}>
            Đối với: Ông(bà)/Tổ chức:{" "}
            <span className={classes.uppercaseText} style={{ fontWeight: 600 }}>
              {sendingData.trafficViolator}.
            </span>
          </Typography>
          <Typography className={classes.textIndent}>
            Địa chỉ:{" "}
            <span className={classes.uppercaseText} style={{ fontWeight: 600 }}>
              {sendingData.violatorAddress}.
            </span>
          </Typography>
          <Typography className={classes.textIndent}>
            Là chủ phương tiện:<span>{sendingData.transportation}</span>, biển
            kiểm soát:{" "}
            <span style={{ fontWeight: 600 }}>{sendingData.plateNumber}</span>,
            vi phạm <span>{sendingData.violationType}</span>.
          </Typography>
          <Typography className={classes.textIndent}>
            Đề nghị Công an(phường xã, thị trấn):{" "}
            <span>{sendingData.policeHeadquarters}</span>chuyển thông báo tới
            Ông(bà)/Tổ chức <span>{sendingData.trafficViolator}</span>.
          </Typography>
          <Typography
            style={{ fontStyle: "italic", fontSize: 14 }}
            className={classes.textIndent}
          >
            Mọi thắc mắc vui lòng liên hệ đội tuyên truyền xử lý:
            <span>{sendingData.phoneNumber}</span>(giờ hành chính, trừ thứ 7,
            chủ nhật, ngày lễ).
          </Typography>
        </Grid>
        <Grid className={classes.footer}>
          <Grid style={{ width: 200 }}>
            <Typography style={{ fontSize: 12, fontWeight: 600 }}>
              Nơi nhận
            </Typography>
            <Typography style={{ fontSize: 12 }}>- Như trên</Typography>
            <Typography style={{ fontSize: 12 }}>
              - Lưu: Hồ sơ vụ việc(<span>{sendingData.sendingCode}</span>)
            </Typography>
          </Grid>
          <Grid style={{ flex: 1 }}>
            <SignViewPdf />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const style = makeStyles({
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
export default DispatchNoteContent;
