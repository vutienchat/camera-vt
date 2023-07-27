import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { getDottedArray } from "../../javacript/common";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    borderTop: "1px dotted #00",
    paddingTop: 20,
    marginLeft: 20,
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
    fontSize: 11,
  },
  line: {
    width: 120,
    height: 1,
    backgroundColor: "#000",
    margin: "5px 0",
  },
});

const HeaderSprintPdf = () => {
  return (
    <View style={styles.root}>
      <View style={styles.rowSpan}>
        <Text style={styles.uppercaseText}>{getDottedArray(60)}</Text>
        <Text style={{ ...styles.uppercaseText }}>{getDottedArray(45)}</Text>
        <View style={styles.line}></View>
        <View>
          <Text style={{ ...styles.fontSmall }}>Số: {getDottedArray(40)}</Text>
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
            {getDottedArray(20)} , ngày {getDottedArray(5)} thàng{" "}
            {getDottedArray(5)} năm {getDottedArray(7)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderSprintPdf;
