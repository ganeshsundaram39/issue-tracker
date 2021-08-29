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


import {
  createNewBoard,
  resetBoard,
} from "../../../state/actions/board.action"

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

  const onSubmit = useCallback(
    (formData) => {
      if (!onNewBoard) {


        dispatch(createNewBoard({ formData }))
      }
    },
    [dispatch, onNewBoard]
  )

  useEffect(() => {
    if (!onNewBoard && newBoardResponse) {
      if (newBoardResponse?.error && newBoardResponse?.message) {
        enqueueSnackbar(newBoardResponse?.message, { variant: "error" })
        dispatch(resetBoard())
      } else if (newBoardResponse?.data) {
        enqueueSnackbar("Board Created!", { variant: "success" })
        dispatch(resetBoard())
        history.push("/boards")
      }
    }
  }, [onNewBoard, newBoardResponse, enqueueSnackbar, dispatch, history])

  useEffect(() => {
    document.title = "IssueTracker | New Board"
  }, [])



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
        <h2>New Board</h2>
        <div className="new-board-form-wrapper">
          <div className="first">
            <TeamBoard color={primaryColorHash} />
          </div>
          <div className="second">
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
