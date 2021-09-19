import React, { useState, useEffect } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Card from "@material-ui/core/Card"
import "./issue-list.scss"
import { getAllIssues, setIssueHeaderTitle } from "../../../state/actions/issue.action"
import { useSelector, useDispatch } from "react-redux"
import IssueTable from "./table/issue-table"
import { Link } from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

const IssueList = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const onGetAllIssue = useSelector((state) => state.issue.onGetAllIssue)
  const allIssueResponse = useSelector((state) => state.issue.allIssueResponse)
  const [openIssues, setOpenIssues] = useState([])
  const [closedIssues, setCloseIssues] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    dispatch(getAllIssues())
  }, [dispatch])

  useEffect(() => {
    if (!onGetAllIssue && allIssueResponse) {
      if (allIssueResponse && allIssueResponse.length) {
        setOpenIssues(allIssueResponse.filter((a) => a.status === "open"))
        setCloseIssues(allIssueResponse.filter((a) => a.status === "closed"))
      }
    }
  }, [onGetAllIssue, allIssueResponse])

  useEffect(() => {
    document.title = "IssueTracker | All Issues"

    dispatch(setIssueHeaderTitle("All Issues"))

  }, [dispatch])
  return (
    <div className="issue-list-wrapper">
      <Card className="card-style">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",

            marginBottom: "15px",
          }}
        >
          <Link
            to={"/issues/new"}
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained" color="primary">
              New Issue
            </Button>
          </Link>
        </div>
        {allIssueResponse && allIssueResponse?.length ? (
          <Paper
            style={{
              flexGrow: 1,
              marginBottom: "5px",
            }}
            square
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="All Issues"
            >
              <Tab label={"Open " + openIssues?.length} />
              <Tab label={"Closed " + closedIssues?.length} />
            </Tabs>
          </Paper>
        ) : null}
        {!onGetAllIssue && allIssueResponse?.length === 0 ? (
          <div className="welcome-to-wrapper">
            <div className="welcome-to">
              <h2>Welcome to IssueTracker!</h2>
              <p>
                Issues are used to track bugs and more. As issues are created,
                they'll appear here in list. To get started, you should
                <Link to={"/issues/new"}>{" create an issue"}</Link>.
              </p>
            </div>
          </div>
        ) : null}
        {allIssueResponse && allIssueResponse?.length ? (
          <IssueTable rows={value === 0 ? openIssues : closedIssues} />
        ) : null}
      </Card>
    </div>
  )
}

export default IssueList
