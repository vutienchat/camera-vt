import {
  Box,
  Checkbox,
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext } from "react";
import { TableCommonContext } from "./TableContent";

const TableBodyContent = () => {
  const { isLoading, tableHeader, tableData, checkedList, setCheckedList } =
    useContext(TableCommonContext);
  const classes = useTableBodyStyle();

  const handleCheckItem = (event) => {
    if (event.target.checked) {
      setCheckedList((prev) => [...prev, event.target.value]);
    } else {
      setCheckedList((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={tableHeader.length + 1}>
          <Box
            style={{ display: "flex", justifyContent: "center", padding: 20 }}
          >
            <CircularProgress color="secondary" />
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  if (!tableData || tableData.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={tableHeader.length + 1}>
          <Typography
            style={{ textAlign: "center", padding: 20, fontSize: 21 }}
          >
            No Data
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody>
      {tableData.map((dataBody) => (
        <TableRow key={dataBody.id}>
          <TableCell width={50}>
            <Checkbox
              value={JSON.stringify(dataBody)}
              checked={checkedList.includes(JSON.stringify(dataBody))}
              onChange={handleCheckItem}
            />
          </TableCell>
          {tableHeader.map((head) => {
            const { field, component, customStyles, width } = head;

            return (
              <TableCell key={field} style={{ ...customStyles, width }}>
                {component ? (
                  component(dataBody)
                ) : (
                  <Typography
                    className={classes.text}
                    style={{
                      width,
                    }}
                  >
                    {dataBody[field]}
                  </Typography>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

const useTableBodyStyle = makeStyles({
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default TableBodyContent;
