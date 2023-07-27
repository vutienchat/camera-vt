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
    fontSize: 11,
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
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 110,
  },
});

const NewSprintContent = () => {
  return (
    <View style={styles.rowSpan}>
      <Text style={{ ...styles.uppercaseText, fontWeight: 600 }}>
        Phiếu báo
      </Text>
      <View style={styles.line}></View>
      <Text>
        Kính gửi: Công an thành phố Thái Nguyên - Công an tỉnh Thái Nguyên
      </Text>
      <View style={{ marginTop: 10 }}>
        <View>
          <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
            Công an phường, xã, thị trấn:
            .....................................................................................................
            đã nhận được thông báo số: ................/PG/CATP, ngày .....
            tháng ..... năm và đã chuyển đến chủ phương tiện theo thông báo hoặc
            ...................................................................................................
          </Text>
          <Text style={{ ...styles.textIndent, ...styles.fontSmall }}>
            Vậy thông báo để cơ quan đã ra thông báo biết.
          </Text>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Nơi nhận</Text>
            <Text style={{ fontSize: 12 }}>- Như trên</Text>
            <Text style={{ fontSize: 12 }}>- Lưu: Hồ sơ vụ việc(CATP)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              Thủ trưởng đơn vị
            </Text>
            <Text style={{ fontSize: 14 }}>
              (Ký, ghi rõ họ tên và đóng dấu)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewSprintContent;
