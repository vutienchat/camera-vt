import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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
    fontSize: 15,
  },
  fontSmall: {
    fontSize: 15,
  },
  line: {
    width: 120,
    height: 1,
    backgroundColor: "#000",
    margin: "5px 0",
  },
});

const HeaderFilePdf = () => {
  return (
    <View style={styles.root}>
      <View style={styles.rowSpan}>
        <Text style={styles.uppercaseText}>Công an Tỉnh Thái Nguyên</Text>
        <Text style={styles.uppercaseText}>Công an Thành Phố </Text>
        <View style={styles.line}></View>
        <View>
          <Text style={{ ...styles.fontSmall }}>Số: 300623-0001/PG/CATP</Text>
        </View>
      </View>
      <View style={styles.rowSpan}>
        <Text style={{ ...styles.uppercaseText, fontWeight: 600 }}>
          Cộng hoà xã hội chủ nghĩa việt nam
        </Text>
        <Text style={{ fontWeight: 600, ...styles.fontSmall }}>
          Độc lập - Tự do - Hạnh phúc
        </Text>
        <View style={styles.line}></View>
        <View>
          <Text style={{ ...styles.fontSmall }}>
            Thái Nguyên, ngày 30 thàng 6 năm 2023
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderFilePdf;
