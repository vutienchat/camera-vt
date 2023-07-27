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
  const {
    isLoading,
    tableHeader,
    tableData,
    checkedItems,
    handleCheckData,
    handleClickColumns,
    checkedable,
  } = useContext(TableCommonContext);
  const classes = useTableBodyStyle();

  const handleCheckItem = (event) => {
    const val = JSON.parse(event.target.value);

    if (event.target.checked) {
      handleCheckData([...checkedItems, val]);
    } else {
      handleCheckData([...checkedItems].filter((item) => item.id !== val.id));
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
          {checkedable && (
            <TableCell width={50}>
              <Checkbox
                value={JSON.stringify(dataBody)}
                checked={!!checkedItems.find((item) => item.id === dataBody.id)}
                onChange={handleCheckItem}
              />
            </TableCell>
          )}
          {tableHeader.map((head) => {
            const { field, component, customStyles, width } = head;

            return (
              <TableCell
                key={field}
                style={{
                  ...customStyles,
                  width,
                  cursor: handleClickColumns ? "pointer" : "auto",
                }}
                onClick={() => {
                  if (handleClickColumns) {
                    handleClickColumns(dataBody);
                  }
                }}
              >
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
