import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  cancelDeleteImage,
  getIssueById,
} from "../../../state/actions/issue.action"
import Card from "@material-ui/core/Card"
import "./issue-view.scss"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import Markdown from "markdown-to-jsx"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Loader from "../../common/loader/loader"

import { useSnackbar } from "notistack"
import Divider from "@material-ui/core/Divider"
import ReactMarkdownEditor from "../react-markdown-editor/react-markdown-editor"

const IssueView = () => {
  const dispatch = useDispatch()
  const { issueId } = useParams()
  const [description, setDescription] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [images, setImages] = useState([])

  const onCancel = useCallback(
    (event) => {
      event.stopPropagation()
      if (images && images.length) {
        cancelDeleteImage(images)
      }
    },
    [images]
  )
  const onGetParticularIssueById = useSelector(
    (state) => state.issue.onGetParticularIssueById
  )

  let history = useHistory()

  const particularIssueById = useSelector(
    (state) => state.issue.particularIssueById
  )

  useEffect(() => {
    dispatch(getIssueById(issueId))
  }, [dispatch, issueId])

  useEffect(() => {
    document.querySelector(".issue-view").scrollIntoView()
  }, [])

  useEffect(() => {
    if (!onGetParticularIssueById && particularIssueById) {
      document.title = "IssueTracker | " + particularIssueById.title

      setDescription(particularIssueById.description)
    }
  }, [onGetParticularIssueById, particularIssueById])

  const redirectToNewIssue = useCallback(
    (event) => {
      event.stopPropagation()
      history.push("/issues/new")
    },
    [history]
  )

  return (
    <div className="issue-view">
      <Card className="card-style">
        {onGetParticularIssueById && <Loader color="black" size={45} />}
        {!onGetParticularIssueById && particularIssueById && (
          <>
            <div className="issue-title">
              <h1>
                {particularIssueById.title}{" "}
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginRight: "15px" }}
                  onClick={redirectToNewIssue}
                >
                  New Issue
                </Button>
              </h1>
              <div className="issue-title-sub">
                <ErrorOutlineOutlinedIcon className="icon" />
                <span className="status">{particularIssueById.status}</span>
                <span>{particularIssueById.issueGenerationTime}</span>
              </div>
            </div>

            <div className="markdown-wrapper">
              <Markdown>
                {description
                  ? description
                  : `<div style="font-size: 15px;">
                    <em>No description provided.</em>
                  </div>`}
              </Markdown>
            </div>
          </>
        )}
        <div
          style={{
            height: "20px",
            width: "20px",
            borderRight: "2px solid #ccc",
          }}
        ></div>
        <Divider
          style={{
            margin: "15px 0",
          }}
        />

          <ReactMarkdownEditor
          description={
            newDescription
          }
          setDescription={
            setNewDescription
          }
          setImages={
            setImages
          }
        />

      </Card>
    </div>
  )
}

export default IssueView
