import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Typography,
  Button,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { format } from "date-fns";

type TableCompProps = {
  data: any[]; // The array of data to display in the table.
  columns: string[]; // Array of column headers.
  title?: string;
};

// Function to format the date using date-fns
const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd-MM-yyyy");
};

const TableComp: React.FC<TableCompProps> = ({ data, columns, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Function to handle nested object paths and format dates
  const getValueByPath = (obj: any, path: string) => {
    const value = path?.split(".").reduce((acc, part) => acc && acc[part], obj);

    // Check if the value is a string and if it's a valid date
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
      return formatDate(value);
    }

    // Return the value as is for non-date values like numbers (e.g., amount)
    return value !== undefined && value !== null ? value : "-";
  };

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      {title && <Typography m={2}>{title}</Typography>}
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {/* Dynamic Table Head */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{ textTransform: "capitalize" }} key={column}>
                {column.replace(".", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {(rowsPerPage > 0
            ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {column === "githubLink" ? (
                    <Button
                      variant="outlined"
                      onClick={() => window.open(row[column], "_blank")}
                    >
                      View
                    </Button>
                  ) : (
                    getValueByPath(row, column)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>
        {/* Pagination */}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns.length}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
