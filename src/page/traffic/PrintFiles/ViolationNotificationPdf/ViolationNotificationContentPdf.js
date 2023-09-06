import React from "react";
import SignViewPdf from "../SignViewPdf";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { notiData } from "../../../../utils/traffic";

const ViolationNotificationContentPdf = () => {
  const classes = styles();
  return (
    <Grid className={classes.rowSpan}>
      <Typography className={classes.uppercaseText} style={{ fontWeight: 600 }}>
        Thông báo
      </Typography>
      <Typography
        style={{
          fontWeight: 600,
          marginTop: 10,
          letterSpacing: 0.5,
        }}
      >
        Vi phạm hành chính về trật tự an toàn giao thông đường bộ
      </Typography>
      <Typography style={{ marginTop: 10 }}>
        Kính gửi: Ông (Bà)/Tổ chức: <span>{notiData.trafficViolator}</span>
      </Typography>
      <Grid style={{ marginTop: 10 }}>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Công an <span>{notiData.cityName}</span> - Công an{" "}
          <span>{notiData.provinceName}</span> đã sử dụng phương tiện, thiết bị
          kỹ thuật nghiệp vụ (hoặc tiếp nhận kết quả ghi thu được từ phương
          tiện, thiết bị kỹ thuật của ....................
          ........................................................................................................................)
          phát hiện và ghi nhận:
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Phương tiện: <span>{notiData.transportation}</span>, biển kiểm soát:{" "}
          <span>{notiData.plateNumber}</span>.
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Chủ phương tiện: <span>{notiData.trafficViolator}</span>.
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Địa chỉ: <span>{notiData.violatorAddress}</span>
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Thời gian, địa điểm vi phạm: <span>{notiData.time}</span>, ngày{" "}
          <span>{notiData.date}</span>, tại Nút giao{" "}
          <span>{notiData.location}</span>
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Hành vi vi phạm: Không chấp hành hiệu lệnh của đèn tín hiệu giao
          thông, được quy định tại điểm a khoản 5 điều 5 Nghị định số
          100/2019/NĐ-CP ngày 30/12/2019 quy định xử phạt vi phạm hành chính
          trong lĩnh vực giao thông đường bộ và đường sắt, được sửa đổi bổ sung
          tại điểm đ khoản 34 điều 2 Nghị định 123/2021/NĐ-CP ngày 28/12/2021
          của Chính phủ sửa đổi bổ sung một số điều của các nghị định quy định
          xử phạt vi phạm hành chính trong lĩnh vực hàng hải; giao thông giao
          thông đường bộ, đường sắt; hàng không dân dụng.
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Biện pháp ngăn chặn được áp dụng (nếu
          có):……………………............................
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Yêu cầu chủ phương tiện, tổ chức, cá nhân có liên quan đến hành vi vi
          phạm sau 7 ngày kể từ ngày nhận thông báo (trong giờ hành chính, trừ
          thứ 7, chủ nhật, ngày lễ, tết) có mặt tại trụ sở Công an thành phố
          Thái Nguyên - Công an <span>{notiData.policeAddress}</span> (Đ/c:
          <span>{notiData.policeAddress}</span>), để giải quyết vụ việc vi phạm
          theo quy định của pháp luật. Nếu việc đi lại gặp khó khăn và không có
          điều kiện trực tiếp đến trụ sở Công an{" "}
          <span>{notiData.cityName}</span> - Công an{" "}
          <span>{notiData.provinceName}</span> để giải quyết vụ việc vi phạm,
          thì đến trụ sở <span>{notiData.otherpoliceHeadquarters}</span> để giải
          quyết vụ việc vi phạm theo quy định của pháp luật.
        </Typography>
        <Typography className={classes.textIndent} style={{ fontSize: 14 }}>
          Khi đến giải quyết phải mang theo thông báo này và các giấy tờ có liên
          quan đến phương tiện và người điều khiển phương tiện. Nếu quá thời
          gian trên, người được yêu cầu không đến để giải quyết vụ việc vi phạm,
          thì sẽ bị xử lý theo quy định của pháp luật.
        </Typography>
        <Typography
          className={styles.textIndent}
          style={{
            fontSize: "11px",
            fontStyle: "italic",
            margin: "5px 0 0 25px",
          }}
        >
          (Kèm theo kết quả thu thập được bằng phương tiện, thiết bị kỹ thuật).
        </Typography>
        <Typography
          className={styles.textIndent}
          style={{
            fontSize: "11px",
            fontStyle: "italic",
            margin: "0 0 0 25px",
          }}
        >
          Mọi thắc mắc vui lòng liên hệ đội tuyên truyền xử lý:{" "}
          <span>{notiData.phoneNumber}</span>
          (giờ hành chính, trừ thứ 7, chủ nhật, ngày lễ).
        </Typography>
      </Grid>
      <Grid className={classes.footer}>
        <Grid style={{ width: 280, marginLeft: 25 }}>
          <Typography style={{ fontSize: 12, fontWeight: 600 }}>
            Nơi nhận
          </Typography>
          <Typography style={{ fontSize: 12 }}>- Như trên</Typography>
          <Typography style={{ fontSize: 12 }}>
            - Đ/c trưởng phòng (để báo cáo)
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            - <span>{notiData.otherpoliceHeadquarters}</span>
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            - Lưu: Hồ sơ vụ việc(<span>{notiData.sendingCode}</span>)
          </Typography>
        </Grid>
        <Grid style={{ flex: 1 }}>
          <SignViewPdf />
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
  fontSmall: {
    fontSize: 15,
    letterSpacing: 0.5,
    marginTop: 5,
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
    letterSpacing: 0.5,
    marginTop: 5,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
    gap: 20,
  },
});

export default ViolationNotificationContentPdf;
