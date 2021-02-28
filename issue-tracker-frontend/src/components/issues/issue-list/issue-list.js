import React, { useState, useEffect } from "react"

import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Card from "@material-ui/core/Card"
import "./issue-list.scss"
import { getAllIssues } from "../../../state/actions/issue.action"
import { useSelector, useDispatch } from "react-redux"
import IssueTable from "./table/issue-table"

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
  }, [])
  return (
    <div className="issue-list-wrapper">
      <Card className="card-style">
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
        <IssueTable rows={value === 0 ? openIssues : closedIssues} />
      </Card>
    </div>
  )
}

export default IssueList
