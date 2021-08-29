import React, { useState, useCallback, useEffect } from "react"
import "./new-issue.scss"
import Card from "@material-ui/core/Card"
import BugFixing from "../../../assets/images/bug-fixing"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"
import {
  createNewIssue,
  resetIssue,
  destroyImages,
} from "../../../state/actions/issue.action"
import ReactMarkdownEditor from "../react-markdown-editor/react-markdown-editor"

import { schema, useStyles, labels } from "./new-issue-extras"

const NewIssue = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  let history = useHistory()
  const [label, setLabel] = useState("")
  const dispatch = useDispatch()
  const classes = useStyles()
  const [comment, setComment] = useState("")
  const { enqueueSnackbar } = useSnackbar()
  const [images, setImages] = useState([])
  const onNewIssue = useSelector((state) => state.issue.onNewIssue)
  const newIssueResponse = useSelector((state) => state.issue.newIssueResponse)
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)

  const onSubmit = useCallback(
    (formData) => {
      if (!onNewIssue) {
        formData["comment"] = comment
        formData["label"] = label

        dispatch(createNewIssue({ formData }))
      }
    },
    [dispatch, comment, label, onNewIssue]
  )

  useEffect(() => {
    if (!onNewIssue && newIssueResponse) {
      if (newIssueResponse?.error && newIssueResponse?.message) {
        enqueueSnackbar(newIssueResponse?.message, { variant: "error" })
        dispatch(resetIssue())
      } else if (newIssueResponse?.data) {
        enqueueSnackbar("Issue Created!", { variant: "success" })
        dispatch(resetIssue())
        history.push("/issues")
      }
    }
  }, [onNewIssue, newIssueResponse, enqueueSnackbar, dispatch, history])

  useEffect(() => {
    document.title = "IssueTracker | New Issue"
  }, [])

  const handleChange = useCallback((event) => {
    setLabel(event.target.value)
  }, [])

  const onCancel = useCallback(
    (event) => {
      event.stopPropagation()
      if (images && images.length) {
        destroyImages(images)
      }

      history.push("/issues")
    },
    [history, images]
  )
  useEffect(() => {
    if (images && images.length) {
      window.onbeforeunload = function () {
        destroyImages(images)
        return true
      }
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [images])
  return (
    <div className="new-issue-container">
      <Card className="new-issue-card">
        <h2>New Issue</h2>
        <div className="new-issue-form-wrapper">
          <div className="first">
            <BugFixing color={primaryColorHash} />
          </div>
          <div className="second">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Enter Title"
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
              <ReactMarkdownEditor
                comment={comment}
                setComment={setComment}
                setImages={setImages}
              />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Label
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={label}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {labels.map((label) => (
                    <MenuItem value={label.value} key={label.value}>
                      {label.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default NewIssue
