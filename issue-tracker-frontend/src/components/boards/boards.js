import React from "react"
import Wrapper from "../common/wrapper/wrapper"
// import NewIssue from "./new-issue/new-issue"
import { Route, Redirect, Switch } from "react-router-dom"
// import IssueList from "./issue-list/issue-list"
// import IssueView from "./issue-view/issue-view"
import "react-mde/lib/styles/css/react-mde-all.css"
import NewBoard from "./new-board/new-board"

const Boards = () => {
  return (
    <Wrapper pageName={"Boards"}>
      <Switch>
        {/* <Route exact path="/boards" component={BoardList} /> */}
        <Route exact path="/boards/new" component={NewBoard} />
        {/* <Route exact path="/boards/:boardId" component={BoardView} /> */}
        <Redirect from="*" to="/boards" />
      </Switch>
    </Wrapper>
  )
}

export default Boards
