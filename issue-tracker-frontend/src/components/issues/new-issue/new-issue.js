import React, { useState, useCallback, useEffect } from "react"

import "./new-issue.scss"

import Card from "@material-ui/core/Card"
import BugFixing from "../../../assets/images/bug_fixing.svg"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"

import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"
import {
  onNewIssue,
  getImageUrl,
  resetIssue,
  cancelDeleteImage,
} from "../../../state/actions/issue.action"
import ReactMarkdownEditor from "../react-markdown-editor/react-markdown-editor"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    "margin-top": "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title cannot be greater than 50 characters"),
})

const NewIssue = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  let history = useHistory()
  const [label, setLabel] = useState("")
  const dispatch = useDispatch()
  const classes = useStyles()
  const [description, setDescription] = useState("")
  const { enqueueSnackbar } = useSnackbar()
  const [images, setImages] = useState([])
  const loading = useSelector((state) => state.issue.onNewIssue)
  const newIssueResponse = useSelector((state) => state.issue.newIssueResponse)

  const onSubmit = useCallback(
    (formData) => {
    if(!loading){

      formData["description"] = description
      formData["label"] = label

      dispatch(onNewIssue({ formData }))}
    },
    [dispatch, description, label]
  )

  useEffect(() => {
    if (!loading && newIssueResponse) {
      if (newIssueResponse?.error && newIssueResponse?.message) {
        enqueueSnackbar(newIssueResponse?.message, { variant: "error" })
        dispatch(resetIssue())
      } else if (newIssueResponse?.data) {
        enqueueSnackbar("Issue Created!", { variant: "success" })
        dispatch(resetIssue())
        history.push("/issues")
      }
    }
  }, [loading, newIssueResponse, enqueueSnackbar, dispatch, history])

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
        cancelDeleteImage(images)
      }

      history.push("/issues")
    },
    [history, images]
  )

  return (
    <div className="new-issue-container">
      <Card className="new-issue-card">
        <h2>New Issue</h2>

        <div className="new-issue-form-wrapper">
          <div className="first">
            <img src={BugFixing} alt="bug fixing" />
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
                description={description}
                setDescription={setDescription}
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

                  <MenuItem value={"bug"}>
                    {"bug => Something isn't working"}
                  </MenuItem>
                  <MenuItem value={"documentation"}>
                    {
                      "documentation => Improvements or additions to documentation"
                    }
                  </MenuItem>
                  <MenuItem value={"duplicate"}>
                    {"duplicate => This issue or pull request already exists"}
                  </MenuItem>
                  <MenuItem value={"enhancement"}>
                    {"enhancement => New feature or request"}
                  </MenuItem>
                  <MenuItem value={"good first issue"}>
                    {"good first issue => Good for newcomers"}
                  </MenuItem>
                  <MenuItem value={"help wanted"}>
                    {"help wanted => Extra attention is needed"}
                  </MenuItem>
                  <MenuItem value={"invalid"}>
                    {"invalid => This doesn't seem right"}
                  </MenuItem>
                  <MenuItem value={"question"}>
                    {"question=> Further information is requested"}
                  </MenuItem>
                  <MenuItem value={"wontfix"}>
                    {"wontfix => This will not be worked on"}
                  </MenuItem>
                </Select>
              </FormControl>

              <div className="buttons top-margin">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginRight: "15px" }}
                >
                  Create Issue
                </Button>
                <Button
                  variant="contained"
                  type="submit"
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
    </div>
  )
}

export default NewIssue
