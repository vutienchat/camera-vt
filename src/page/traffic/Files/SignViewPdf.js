import React from "react";
import { Text, View } from "@react-pdf/renderer";

const SignViewPdf = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <View style={{ width: 150 }}>
        <View style={{ border: "1px solid #000", width: "100%" }}>
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            Trưởng phòng ký
          </Text>
        </View>
        <View style={{ border: "1px solid #000", width: "100%", height: 100 }}>
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            TRƯỞNG PHÒNG
          </Text>
        </View>
      </View>
      <View style={{ width: 150 }}>
        <View style={{ border: "1px solid #000", width: "100%" }}>
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            Phó Phòng ký
          </Text>
        </View>
        <View style={{ border: "1px solid #000", width: "100%", height: 100 }}>
          <Text style={{ fontSize: 14, textAlign: "center" }}>PHÓ PHÒNG</Text>
        </View>
      </View>
    </View>
  );
};

export default SignViewPdf;
