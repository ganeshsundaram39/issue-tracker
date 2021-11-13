import React, { useState, useCallback, useEffect } from "react"
import "../new-board/new-board.scss"
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

import { useParams } from "react-router-dom"

import {
  getBoardById,
  editBoard,
  resetBoard,
  setBoardHeaderTitle,
} from "../../../state/actions/board.action"
import { imagesArray, images } from "../../common/wrapper/images"
import Loader from "../../common/loader/loader"

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title cannot be greater than 50 characters"),
})

const EditBoard = () => {
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  let history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onEditBoard = useSelector((state) => state.board.onEditBoard)
  const editBoardResponse = useSelector(
    (state) => state.board.editBoardResponse
  )
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)
  const [boardBackgroundImg, setBoardBackgroundImg] = useState("default")
  const { boardId } = useParams()


  const onGetParticularBoardById = useSelector(
    (state) => state.board.onGetParticularBoardById
  )
  const particularBoardById = useSelector(
    (state) => state.board.particularBoardById
  )

  useEffect(() => {
    document.title = "IssueTracker | Edit Board"
    dispatch(setBoardHeaderTitle("Edit Board"))
  }, [dispatch])

  useEffect(() => {
    dispatch(getBoardById(boardId))
  }, [dispatch, boardId])

  useEffect(() => {
    if (!onGetParticularBoardById && particularBoardById) {
      if (particularBoardById.title && particularBoardById.boardBackgroundImg) {
        document.title =
          "IssueTracker | Edit Board | " + particularBoardById.title

        setValue("title", particularBoardById.title, {
          shouldValidate: true,
          shouldDirty: true,
        })

        setBoardBackgroundImg(particularBoardById.boardBackgroundImg)
        dispatch(
          setBoardHeaderTitle("Edit Board | " + particularBoardById.title)
        )
      } else {
        enqueueSnackbar("Board Not Found", { variant: "error" })
        history.push("/404")
      }
    }
  }, [
    onGetParticularBoardById,
    particularBoardById,
    dispatch,
    history,
    enqueueSnackbar,
    setValue
  ])

  const onSubmit = useCallback(
    (formData) => {
      if (!onEditBoard) {
        formData = { ...formData, boardBackgroundImg, boardId }
        dispatch(editBoard({ formData }))
      }
    },
    [dispatch, onEditBoard, boardBackgroundImg,boardId]
  )

  const onCancel = useCallback(
    (event) => {
      event.stopPropagation()
      history.push("/boards")
    },
    [history]
  )

  useEffect(() => {
    if (!onEditBoard && editBoardResponse) {
      if (editBoardResponse?.error && editBoardResponse?.message) {
        enqueueSnackbar(editBoardResponse?.message, { variant: "error" })

      } else if (editBoardResponse?.data) {
        enqueueSnackbar("Board Updated!", { variant: "success" })
        dispatch(resetBoard())
        history.push("/boards/"+boardId)
      }
    }
  }, [onEditBoard, editBoardResponse, enqueueSnackbar, dispatch, history,boardId])

  return (
    <div className="new-board-container">
      {onGetParticularBoardById || !particularBoardById ? (
        <Loader backgroundColor={"transparent"} />
      ) : (
        <Card className="new-board-card">
          <div className="new-board-form-wrapper">
            <div className="first">
              <TeamBoard color={primaryColorHash} />
            </div>
            <div className="second">
              <h2>Edit Board</h2>
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
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default EditBoard
