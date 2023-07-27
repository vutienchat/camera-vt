import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import SignViewPdf from "../SignViewPdf";

const styles = StyleSheet.create({
  rowSpan: {
    display: "flex",
    marginTop: 10,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  uppercaseText: {
    textTransform: "uppercase",
    fontSize: 15,
  },
  fontSmall: {
    fontSize: 11,
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

const ViolationNotificationContentPdf = () => {
  return (
    <View style={styles.rowSpan}>
      <Text style={{ ...styles.uppercaseText, fontWeight: 600 }}>
        Thông báo
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
          marginTop: 10,
          letterSpacing: 0.5,
        }}
      >
        Vi phạm hành chính về trật tự an toàn giao thông đường bộ
      </Text>
      <Text style={{ ...styles.fontSmall, marginTop: 10 }}>
        Kính gửi: Ông (Bà)/Tổ chức: CÔNG TY TNHH MTV EAGON
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Công an thành phố Thái Nguyên - Công an tỉnh Thái Nguyên đã sử dụng
          phương tiện, thiết bị kỹ thuật nghiệp vụ (hoặc tiếp nhận kết quả ghi
          thu được từ phương tiện, thiết bị kỹ thuật của ....................
          ........................................................................................................................)
          phát hiện và ghi nhận:
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Phương tiện: Ô tô, biển kiểm soát: 15A-235.18.
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Địa chỉ: TỔ DÂN PHỐ NGHĨA SƠN, MINH ĐỨC, QUẬN ĐỒ SƠN, THÀNH PHỐ HẢI
          PHÒNG.
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Thời gian, địa điểm vi phạm: 05:33:35, ngày 29/06/2023, tại Nút giao
          Phạm Văn Đồng - đường tỉnh 363 (phường Hải Thành, quận Dương Kinh,
          thành phố Hải Phòng)
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Hành vi vi phạm: Không chấp hành hiệu lệnh của đèn tín hiệu giao
          thông, được quy định tại điểm a khoản 5 điều 5 Nghị định số
          100/2019/NĐ-CP ngày 30/12/2019 quy định xử phạt vi phạm hành chính
          trong lĩnh vực giao thông đường bộ và đường sắt, được sửa đổi bổ sung
          tại điểm đ khoản 34 điều 2 Nghị định 123/2021/NĐ-CP ngày 28/12/2021
          của Chính phủ sửa đổi bổ sung một số điều của các nghị định quy định
          xử phạt vi phạm hành chính trong lĩnh vực hàng hải; giao thông giao
          thông đường bộ, đường sắt; hàng không dân dụng.
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Biện pháp ngăn chặn được áp dụng (nếu
          có):……………………............................
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Yêu cầu chủ phương tiện, tổ chức, cá nhân có liên quan đến hành vi vi
          phạm sau 7 ngày kể từ ngày nhận thông báo (trong giờ hành chính, trừ
          thứ 7, chủ nhật, ngày lễ, tết) có mặt tại trụ sở Công an thành phố
          Thái Nguyên - Công an tỉnh Thái Nguyên (Đ/c: số 1 Trần Hữu Dực, Nam Từ
          Liêm), để giải quyết vụ việc vi phạm theo quy định của pháp luật. Nếu
          việc đi lại gặp khó khăn và không có điều kiện trực tiếp đến trụ sở
          Công an thành phố Thái Nguyên - Công an tỉnh Thái Nguyên để giải quyết
          vụ việc vi phạm, thì đến trụ sở Công an Quận Đồ Sơn, Thành phố Hải
          Phòng để giải quyết vụ việc vi phạm theo quy định của pháp luật.
        </Text>
        <Text
          style={{
            ...styles.textIndent,
            ...styles.fontSmall,
          }}
        >
          Khi đến giải quyết phải mang theo thông báo này và các giấy tờ có liên
          quan đến phương tiện và người điều khiển phương tiện. Nếu quá thời
          gian trên, người được yêu cầu không đến để giải quyết vụ việc vi phạm,
          thì sẽ bị xử lý theo quy định của pháp luật.
        </Text>
        <Text
          style={{
            fontSize: "8px",
            ...styles.textIndent,
            marginTop: 5,
          }}
        >
          (Kèm theo kết quả thu thập được bằng phương tiện, thiết bị kỹ thuật).
        </Text>
        <Text
          style={{
            fontSize: "8px",
            ...styles.textIndent,
            marginTop: 5,
          }}
        >
          Mọi thắc mắc vui lòng liên hệ đội tuyên truyền xử lý: 0394.690.802
          (giờ hành chính, trừ thứ 7, chủ nhật, ngày lễ).
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: 600 }}>Nơi nhận</Text>
          <Text style={{ fontSize: 12 }}>- Như trên</Text>
          <Text style={{ fontSize: 12 }}>- Đ/c trưởng phòng (để báo cáo)</Text>
          <Text style={{ fontSize: 12 }}>
            - Công an Quận Đồ Sơn, Thành phố Hải Phòng
          </Text>
          <Text style={{ fontSize: 12 }}>- Lưu: Hồ sơ vụ việc(CATP)</Text>
        </View>
        <SignViewPdf />
      </View>
    </View>
  );
};

export default ViolationNotificationContentPdf;
