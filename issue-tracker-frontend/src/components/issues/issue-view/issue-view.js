import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getIssueById } from "../../../state/actions/issue.action"
import Card from "@material-ui/core/Card"
import "./issue-view.scss"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import Markdown from "markdown-to-jsx"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Loader from "../../common/loader/loader"
import Divider from "@material-ui/core/Divider"
import ReactMarkdownEditor from "../react-markdown-editor/react-markdown-editor"

const connectDivs = (
  <div
    style={{
      height: "20px",
      width: "20px",
      borderRight: "2px solid #ccc",
    }}
  ></div>
)

const IssueView = () => {
  const dispatch = useDispatch()
  const { issueId } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [images, setImages] = useState([])
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
  const closeIssue = useCallback(() => {},[])
  const addNewComment = useCallback(() => {},[])
  return (
    <div className="issue-view">
      <Card className="card-style">
        {onGetParticularIssueById && <Loader color="black" size={45} />}
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
            ):null}
            {comments &&
              comments.length?
              comments.map((comment) => (
                <>
                  <div className="markdown-wrapper">
                    <Markdown>{comment.comment}</Markdown>
                  </div>
                  {connectDivs}
                </>
              )):null}
            <Divider
              style={{
                marginBottom: "15px",
              }}
            />
            <ReactMarkdownEditor
              comment={newComment}
              setComment={setNewComment}
              setImages={setImages}
            />
            <div className="new-comment-wrapper">
              <Button
                variant="contained"

                color="secondary"

                onClick={closeIssue}
              >
                Close issue
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
        ):null}
      </Card>
    </div>
  )
}

export default IssueView
