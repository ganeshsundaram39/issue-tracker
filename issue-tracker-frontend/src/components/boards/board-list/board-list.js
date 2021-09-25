import React, { useEffect,useState } from "react"

import Card from "@material-ui/core/Card"
import "./board-list.scss"
import {
  getAllBoards,
  setBoardHeaderTitle,
} from "../../../state/actions/board.action"
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import BoardTable from "./table/board-table"
import { useSnackbar } from "notistack"

const BoardList = () => {
  const dispatch = useDispatch()
  const onGetAllBoard = useSelector((state) => state.board.onGetAllBoard)
  const allBoardResponse = useSelector((state) => state.board.allBoardResponse)
  const [allBoards, setAllBoards] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const onDeleteBoard = useSelector((state) => state.board.onDeleteBoard)
  const onDeleteBoardResponse = useSelector(
    (state) => state.board.onDeleteBoardResponse
  )
  useEffect(() => {
    dispatch(getAllBoards())
  }, [dispatch])

  useEffect(() => {
    if (!onGetAllBoard && allBoardResponse) {
      if (allBoardResponse && allBoardResponse.length) {
        setAllBoards(allBoardResponse)
      }
    }
  }, [onGetAllBoard, allBoardResponse])


  useEffect(() => {
    if (!onDeleteBoard && onDeleteBoardResponse) {
      if (onDeleteBoardResponse?.error && onDeleteBoardResponse?.message) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      } else if (onDeleteBoardResponse?.data) {
        enqueueSnackbar("Board Deleted!", { variant: "success" })
        dispatch(getAllBoards())
      }
    }
  }, [
    onDeleteBoard,
    onDeleteBoardResponse,
    enqueueSnackbar,
    dispatch
  ])


  useEffect(() => {
    document.title = "IssueTracker | All Boards"

    dispatch(setBoardHeaderTitle("All Boards"))
  }, [dispatch])
  return (
    <div className="board-list-wrapper">
      <Card className="card-style">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",

            marginBottom: "15px",
          }}
        >
          <Link
            to={"/boards/new"}
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained" color="primary">
              New Board
            </Button>
          </Link>
        </div>

        {!onGetAllBoard && allBoardResponse?.length === 0 ? (
          <div className="welcome-to-wrapper">
            <div className="welcome-to">
              <h2>Welcome to IssueTracker Boards!</h2>
              <p>
                A board is made up of cards ordered on lists. Use it to manage
                projects, track information, or organize anything. To get
                started, you should
                <Link to={"/boards/new"}>{" create a board"}</Link>.
              </p>
            </div>
          </div>
        ) : null}
        {allBoardResponse && allBoardResponse?.length ? (
          <BoardTable rows={allBoards} />
        ) : null}
      </Card>
    </div>
  )
}

export default BoardList
