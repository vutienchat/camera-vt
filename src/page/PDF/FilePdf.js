import { Box } from "@material-ui/core";
import { PDFViewer } from "@react-pdf/renderer";
import DispatchNote from "../traffic/Files/DispatchNotePdf/DispatchNotePdf";

const FilePdf = () => {
  return (
    <Box>
      <PDFViewer style={{ width: 700, height: 900 }} showToolbar={false}>
        <DispatchNote />
      </PDFViewer>
    </Box>
  );
};

export default FilePdf;
