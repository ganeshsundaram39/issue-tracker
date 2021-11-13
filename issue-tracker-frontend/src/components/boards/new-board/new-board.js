import React, { useState, useCallback, useEffect } from "react"
import "./new-board.scss"
import Card from "@material-ui/core/Card"
import TeamBoard from "../../../assets/images/team-board"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import { useHistory } from "react-router-dom"
import * as yup from "yup"
import { InputLabel } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import {
  createNewBoard,
  resetBoard,
  setBoardHeaderTitle,
} from "../../../state/actions/board.action"
import { imagesArray, images } from "../../common/wrapper/images"

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title cannot be greater than 50 characters"),
})

const NewBoard = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  let history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onNewBoard = useSelector((state) => state.board.onNewBoard)
  const newBoardResponse = useSelector((state) => state.board.newBoardResponse)
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)
  const [boardBackgroundImg, setBoardBackgroundImg] = useState("default")

  const onSubmit = useCallback(
    (formData) => {
      if (!onNewBoard) {
        formData = { ...formData, boardBackgroundImg }
        dispatch(createNewBoard({ formData }))
      }
    },
    [dispatch, onNewBoard, boardBackgroundImg]
  )

  useEffect(() => {
    if (!onNewBoard && newBoardResponse) {
      if (newBoardResponse?.error && newBoardResponse?.message) {
        enqueueSnackbar(newBoardResponse?.message, { variant: "error" })

      } else if (newBoardResponse?.data) {
        enqueueSnackbar("Board Created!", { variant: "success" })
        dispatch(resetBoard())
        history.push("/boards/"+newBoardResponse?.data?.boardId)
      }
    }
  }, [onNewBoard, newBoardResponse, enqueueSnackbar, dispatch, history])

  useEffect(() => {
    document.title = "IssueTracker | New Board"
    dispatch(setBoardHeaderTitle("New Board"))
  }, [dispatch])

  const onCancel = useCallback(
    (event) => {
      event.stopPropagation()
      history.push("/boards")
    },
    [history]
  )

  return (
    <div className="new-board-container">
      <Card className="new-board-card">

        <div className="new-board-form-wrapper">
          <div className="first">
            <TeamBoard color={primaryColorHash} />
          </div>
          <div className="second">
             <h2>New Board</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Enter Board Title"
                name="title"
                type="text"
                error={!!errors.title}
                helperText={
                  errors?.title?.message ? errors?.title?.message : " "
                }
                inputRef={register}
                fullWidth
                variant="filled"
              />

              <div>
                <InputLabel className={"board-label"}>
                  Board Background
                </InputLabel>
                <div className="board-images">
                  {imagesArray.map((image) => (
                    <div
                      key={image}
                      className="board-image"
                      onClick={() => setBoardBackgroundImg(image)}
                      style={{ backgroundImage: `url(${images[image]})` }}
                    >
                      {boardBackgroundImg === image ? (
                        <CheckIcon className="check-icon" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="buttons top-margin">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginRight: "15px" }}
                >
                  Create
                </Button>
                <Button variant="contained" color="primary" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NewBoard
