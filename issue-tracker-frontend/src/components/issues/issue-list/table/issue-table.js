import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import "./issue-table.scss"
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined"
import { TablePaginationActions } from "./issue-table-paginate/issue-table-paginate"
import { Link } from "react-router-dom"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import { useSelector } from "react-redux"

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
})

export default function IssueTable({ rows }) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table"
        component="div"

      >
        <TableBody
        component="div"

        >
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow
              component={Link}
              to={"/issues/" + row.issueId}
              key={row.issueId}
              style={{
                background: index % 2 ? "#fdffe0" : "white",
                textDecoration: "none",
              }}
            >
              <TableCell component="div" scope="row">
                <div className="single-issue">
                  <ErrorOutlineOutlinedIcon className="icon" />

                  <span className="issue-title"> {row.title} </span>

                  {row.label && (
                    <span
                      className="label-style"
                      style={{
                        borderColor: primaryColorHash,
                        background: primaryColorHash,
                      }}
                    >
                      {row.label}
                    </span>
                  )}
                </div>
                <div className="single-issue-details">
                  <ErrorOutlineOutlinedIcon
                    style={{
                      visibility: "hidden",
                      height: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#555",
                    }}
                  >
                    {" "}
                    {row.issueGenerationTime}
                  </span>
                </div>
              </TableCell>

              <TableCell style={{ width: 160 }} align="right"
              component="div"
              >
                {row.comments && row.comments.length > 1 ? (
                  <div className="issue-comment-count">
                    <CommentOutlinedIcon
                      style={{
                        marginRight: "5px",
                        fontSize: "20px",
                      }}
                    />{" "}
                    {row.comments.length - 1}
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}
            component="div" >
              <TableCell colSpan={6} component="div"  style={{ border: 0 }} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter component="div">
          <TableRow component="div">
            <TablePagination component="div"
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
