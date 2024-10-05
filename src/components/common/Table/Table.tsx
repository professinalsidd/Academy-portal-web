import React from "react";
import * as MUI from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { format } from "date-fns";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type TableCompProps = {
  data: any[];
  columns: string[];
  title?: string;
};

// Function to format the date and time separately
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd-MM-yyyy");
  const formattedTime = format(date, "hh:mm a");
  return { formattedDate, formattedTime };
};

const TableComp: React.FC<TableCompProps> = ({ data, columns, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Function to handle nested object paths and format dates
  const getValueByPath = (obj: any, path: string) => {
    const value = path?.split(".").reduce((acc, part) => acc && acc[part], obj);

    // Check if the value is a string and if it's a valid date
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
      const { formattedDate, formattedTime } = formatDateTime(value);
      return (
        <div>
          <MUI.Typography>{formattedDate}</MUI.Typography>
          <MUI.Box display={"flex"} alignItems={"center"}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <MUI.Typography> {formattedTime}</MUI.Typography>
          </MUI.Box>
        </div>
      );
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
    rowsPerPage - Math?.min(rowsPerPage, data?.length - page * rowsPerPage);

  return (
    <MUI.TableContainer component={MUI.Paper}>
      {title && <MUI.Typography m={2}>{title}</MUI.Typography>}
      <MUI.Table sx={{}} aria-label="custom pagination table">
        {/* Dynamic Table Head */}
        <MUI.TableHead>
          <MUI.TableRow>
            {columns?.map((column) => (
              <MUI.TableCell sx={{ textTransform: "capitalize" }} key={column}>
                {column?.replace(".", " ")}
              </MUI.TableCell>
            ))}
          </MUI.TableRow>
        </MUI.TableHead>
        {/* Table Body */}
        <MUI.TableBody>
          {(rowsPerPage > 0
            ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          )?.map((row, index) => (
            <MUI.TableRow key={index}>
              {columns?.map((column) => (
                <MUI.TableCell key={column}>
                  {column === "githubLink" ? (
                    <MUI.Button
                      variant="outlined"
                      onClick={() => window.open(row[column], "_blank")}
                    >
                      View
                    </MUI.Button>
                  ) : (
                    getValueByPath(row, column)
                  )}
                </MUI.TableCell>
              ))}
            </MUI.TableRow>
          ))}
          {emptyRows > 0 && (
            <MUI.TableRow style={{ height: 53 * emptyRows }}>
              <MUI.TableCell colSpan={columns?.length} />
            </MUI.TableRow>
          )}
        </MUI.TableBody>
        {/* Pagination */}
        <MUI.TableFooter>
          <MUI.TableRow>
            <MUI.TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns?.length}
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </MUI.TableRow>
        </MUI.TableFooter>
      </MUI.Table>
    </MUI.TableContainer>
  );
};

export default TableComp;
