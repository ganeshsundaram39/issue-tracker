import React from "react"
import Wrapper from "../common/wrapper/wrapper"
import NewIssue from "./new-issue/new-issue"
import { Route, Redirect, Switch } from "react-router-dom"
import IssueList from "./issue-list/issue-list"
import IssueView from "./issue-view/issue-view"
import "react-mde/lib/styles/css/react-mde-all.css"

const Issues = () => {
  return (
    <Wrapper pageName={"Issues"}>
      <Switch>
        <Route exact path="/issues" component={IssueList} />
        <Route exact path="/issues/new" component={NewIssue} />
        <Route exact path="/issues/:issueId" component={IssueView} />
        <Redirect from="*" to="/issues" />
      </Switch>
    </Wrapper>
  )
}

export default Issues
