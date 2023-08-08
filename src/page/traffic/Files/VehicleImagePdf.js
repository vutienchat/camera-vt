import React from "react";
import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  rowSpan: {
    display: "flex",
    marginTop: 10,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    paddingRight: 30,
    paddingLeft: 50,
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

const VehicleImagePdf = () => {
  return (
    <View style={styles.rowSpan}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Image src="/csgt.jpg" style={{ width: 30, height: 40 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ ...styles.uppercaseText, textAlign: "center" }}>
            HỆ THỐNG GIÁM SÁT TRẬT TỰ
          </Text>
          <Text style={{ ...styles.uppercaseText, textAlign: "center" }}>
            AN TOÀN GIAO THÔNG ĐƯỜNG BỘ BẰNG HÌNH ẢNH
          </Text>
          <View
            style={{
              width: 180,
              height: 1,
              backgroundColor: "#000",
              marginTop: 10,
            }}
          ></View>
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          ...styles.fontSmall,
          paddingVertical: 30,
          fontWeight: 600,
        }}
      >
        HÌNH ẢNH PHƯƠNG TIỆN VI PHẠM
      </Text>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Vào hồi :</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>05:33:35 ngày 29/06/2023</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Địa điểm :</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>
            Nút giao Phạm Văn Đồng - đường tỉnh 363 (phường Hải Thành, quận
            Dương Kinh, thành phố Hải Phòng)
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Hành vi vi phạm :</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>
            Không chấp hành hiệu lệnh của đèn tín hiệu giao thông
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>
          - Biển số phương tiện vi phạm :
        </Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>15A-235.18</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Thiết bị phát hiện:</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>CAMERA Ngã tư 363 (2)</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Đơn vị vận hành :</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>
            Công an thành phố Thái Nguyên - Công an tỉnh Thái Nguyên
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ ...styles.fontSmall }}>- Toạ độ :</Text>
        <View style={{ width: 300 }}>
          <Text style={{ ...styles.fontSmall }}>20.79274500 106.71510200</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          width: "100%",
          marginTop: 20,
        }}
      >
        <View style={{ width: 150 }}>
          <View
            style={{ width: "100%", height: 200, backgroundColor: "#808080" }}
          ></View>
          <View
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
            <Text style={{ fontSize: 8, textAlign: "center" }}>
              Ảnh chụp phương tiện
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ width: "100%", height: 200, backgroundColor: "#808080" }}
          ></View>
          <View
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
            <Text style={{ fontSize: 8, textAlign: "center", width: 80 }}>
              Ảnh chụp màn hình
            </Text>
            <Text style={{ fontSize: 8, width: 230 }}>
              Nút giao Phạm Văn Đồng - đường tỉnh 363 (phường Hải Thành, quận
              Dương Kinh, thành phố Hải Phòng)
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          width: "100%",
          marginTop: 10,
        }}
      >
        <View style={{ width: 150 }}>
          <View
            style={{ width: "100%", height: 100, backgroundColor: "#808080" }}
          ></View>
          <View
            style={{
              padding: 5,
              width: "100%",
              backgroundColor: "#b3b3b3",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 8, textAlign: "center" }}>
              Ảnh chụp biển số
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ width: "100%", height: 100 }}>
            <Image
              src={{
                uri: "https://maps.googleapis.com/maps/api/staticmap?center=21.0285,105.8542&zoom=16&size=600x400&key=AIzaSyDI3p_xqPNiCKgtK_yIDkXiq-BJ_aRNjpI&markers=color:red%7C21.0285,105.8542",
              }}
              alt="image Map"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: "100%",
              backgroundColor: "#b3b3b3",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 8, textAlign: "center" }}>Bản đồ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VehicleImagePdf;
