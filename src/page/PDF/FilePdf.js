import { Box } from "@material-ui/core";
import { PDFViewer } from "@react-pdf/renderer";
import ViolationNotificationPdf from "../traffic/Files/ViolationNotificationPdf/ViolationNotificationPdf";

const FilePdf = () => {
  return (
    <Box>
      <PDFViewer style={{ width: 700, height: 900 }} showToolbar={true}>
        <ViolationNotificationPdf checkedItemList={[{ id: 1 }, { id: 2 }]} />
      </PDFViewer>
    </Box>
  );
};

export default FilePdf;
