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
import "./board-table.scss"
import { Link } from "react-router-dom"
import { TablePaginationActions } from "../../../issues/issue-list/table/issue-table-paginate/issue-table-paginate"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import { useDispatch } from "react-redux"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import AlertDialog from "../../../common/alert"
import { deleteBoard } from "../../../../state/actions/board.action"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
})

export default function BoardTable({ rows }) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const dispatch = useDispatch()
  let history = useHistory()

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const deleteBoardCallback = (event, boardId) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    dispatch(deleteBoard({ boardId }))
  }

  const redirectToBoardView = (event, boardId) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()
    history.push("/boards/edit/" + boardId)
  }

  return (
    <TableContainer component={Paper}>
      <Table
        component="div"
        className={classes.table}
        aria-label="custom pagination table"
      >
        <TableBody component="div">
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow
              component={Link}
              to={"/boards/" + row.boardId}
              key={row.boardId}
              style={{
                background: index % 2 ? "#fdffe0" : "white",
                textDecoration: "none",
              }}
            >
              <TableCell component="div" scope="row">
                <div className="single-board">
                  <FormatListBulletedIcon className="icon" />

                  <span className="board-title"> {row.title} </span>
                </div>
                <div className="single-board-details">
                  <FormatListBulletedIcon
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
                    {row.boardGenerationTime}
                  </span>
                </div>
              </TableCell>

              <TableCell
                component="div"
                style={{ minWidth: 200 }}
                align="right"
              >
                <div className="board-control">
                  <EditOutlinedIcon
                    onClick={(event) => redirectToBoardView(event, row.boardId)}
                    title={"Edit " + row.title}
                  />
                  <AlertDialog
                    message="Are you sure you want to delete this board?"
                    title="Delete"
                    handleYes={(event) =>
                      deleteBoardCallback(event, row.boardId)
                    }
                    handleNo={() => {}}
                  >
                    {({ handleClickOpen }) => (
                      <DeleteOutlineOutlinedIcon
                        title={"Delete " + row.title}
                        onClick={handleClickOpen}
                      />
                    )}
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow component="div" style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} component="div" style={{ border: 0 }} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter component="div">
          <TableRow component="div">
            <TablePagination
              component="div"
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
