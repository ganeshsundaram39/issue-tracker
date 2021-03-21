import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  getIssueById,
  updateComments,
  updateStatus,
} from "../../../state/actions/issue.action"
import Card from "@material-ui/core/Card"
import "./issue-view.scss"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import Markdown from "markdown-to-jsx"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import ReactMarkdownEditor from "../react-markdown-editor/react-markdown-editor"
import { useSnackbar } from "notistack"
import { connectDivs } from "../../common/connectDivs"

const IssueView = () => {
  const dispatch = useDispatch()
  const { issueId } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [images, setImages] = useState([])
  const { enqueueSnackbar } = useSnackbar()

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

      setComments(particularIssueById.comments)
    }
  }, [onGetParticularIssueById, particularIssueById])

  const redirectToNewIssue = useCallback(
    (event) => {
      event.stopPropagation()
      history.push("/issues/new")
    },
    [history]
  )
  const closeIssue = () => {
    enqueueSnackbar(
      `Issue ${particularIssueById.status === "open" ? "Closed" : "Reopened"}!`,
      { variant: "success" }
    )

    dispatch(
      updateStatus({
        issueId: particularIssueById.issueId,
        status: particularIssueById.status === "open" ? "closed" : "open",
      })
    )
  }

  const addNewComment = () => {
    if (!newComment) return

    dispatch(
      updateComments({
        issueId: particularIssueById.issueId,
        comment: newComment,
      })
    )

    setNewComment("")
  }

  return (
    <div className="issue-view">
      <Card className="card-style">
        {!onGetParticularIssueById && particularIssueById ? (
          <>
            <div className="issue-title">
              <h1>
                {particularIssueById.title}{" "}
                <Button
                  variant="contained"
                  color="primary"
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
            {comments && comments.length === 0 ? (
              <div className="markdown-wrapper">
                <Markdown>
                  {`<div style="font-size: 15px;">
                     <em>No description provided.</em>
                   </div>`}
                </Markdown>
              </div>
            ) : null}
            {comments && comments.length
              ? comments.map((comment) => (
                  <div key={comment.commentId}>
                    <div className="markdown-wrapper">
                      <Markdown>{comment.comment}</Markdown>
                    </div>
                    {connectDivs}
                  </div>
                ))
              : null}
            <Divider
              style={{
                marginBottom: "15px",
              }}
            />
            <ReactMarkdownEditor
              comment={newComment}
              setComment={setNewComment}
              setImages={setImages}
              images={images}
            />
            <div className="new-comment-wrapper">
              <Button variant="contained" color="primary" onClick={closeIssue}>
                {particularIssueById.status === "open" ? "Close" : "Reopen"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addNewComment}
              >
                Comment
              </Button>
            </div>
          </>
        ) : null}
      </Card>
    </div>
  )
}

export default IssueView
