import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

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
    fontSize: 15,
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
});

const DispatchNoteContent = () => {
  return (
    <View style={styles.rowSpan}>
      <Text style={{ ...styles.uppercaseText, fontWeight: 600 }}>
        Phiếu gửi
      </Text>
      <Text style={{ ...styles.fontSmall, fontWeight: 600 }}>
        Thông báo vi phạm hành chính về trật tự an toàn giao thông đường bộ
      </Text>
      <View style={styles.line}></View>
      <Text>Kính gửi: Công an (phường, xã, thị trấn): Minh Đức</Text>
      <View style={{ marginTop: 5 }}>
        <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
          Công an thành phố Thái Nguyên - Công an tỉnh Thái Nguyên thực hiện
          Thông báo vi phạm hành chính về TTATGT đường bộ số: 300623-0001/CATP,
          ngày 30 tháng 6 năm 2023.
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              ...styles.textIndent,
              ...styles.fontSmall,
            }}
          >
            Đối với: Ông(bà)/Tổ chức: CÔNG TY TNHH MTV EAGON.
          </Text>
          <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
            Địa chỉ: TỔ DÂN PHỐ NGHĨA SƠN, MINH ĐỨC, QUẬN ĐỒ SƠN, THÀNH PHỐ HẢI
            PHÒNG.
          </Text>
          <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
            Là chủ phương tiện: Ô tô, biển kiểm soát: 15A-235.18, vi phạm Không
            chấp hành hiệu lệnh của đèn tín hiệu giao thông.
          </Text>
          <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
            Đề nghị Công an(phường xã, thị trấn): Minh Đức chuyển thông báo tới
            Ông(bà)/Tổ chức CÔNG TY TNHH MTV EAGON và giám sát thực hiện
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DispatchNoteContent;
