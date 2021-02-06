import React from "react"
import Wrapper from "../common/wrapper/wrapper"
import NewIssue from "./new-issue/new-issue"
import { Route, Redirect, Switch } from "react-router-dom"
import IssueList from "./issue-list/issue-list"

const Issues = () => {
  return (
    <Wrapper pageName={"Issues"}>
      <Switch> <Route exact path="/issues" component={IssueList} />
      <Route exact path="/issues/new" component={NewIssue} />
        <Redirect from="*" to="/issues" />
      </Switch>
    </Wrapper>
  )
}

export default Issues
