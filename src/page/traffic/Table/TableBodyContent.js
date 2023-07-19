import {
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext } from "react";
import { TableCommonContext } from "./TableContent";

const TableBodyContent = () => {
  const { tableHeader, tableData, checkedList, setCheckedList } =
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

  if (!tableData) {
    return (
      <TableRow>
        <TableCell rowSpan={tableHeader.length + 1}>No Data</TableCell>
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
