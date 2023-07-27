import { Document, Page, Font, StyleSheet } from "@react-pdf/renderer";
import VehicleImagePdf from "../Files/VehicleImagePdf";

Font.register({
  family: "AlegreyaSans",
  fonts: [
    {
      src: "/fonts/AlegreyaSans-Light.ttf",
    },
    {
      src: "/fonts/AlegreyaSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    fontFamily: "AlegreyaSans",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 25,
  },
});

const ViolationImageModal = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <VehicleImagePdf />
      </Page>
    </Document>
  );
};

export default ViolationImageModal;
