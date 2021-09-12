import React from "react"
import Wrapper from "../common/wrapper/wrapper"
import { Route, Redirect, Switch } from "react-router-dom"
import NewBoard from "./new-board/new-board"
import BoardList from "./board-list/board-list"
import BoardView from "./board-view/board-view"
import { useSelector } from "react-redux"

const Boards = () => {

  const boardHeaderTitle = useSelector((state) => state.board.boardHeaderTitle)


  return (
    <Wrapper pageName={boardHeaderTitle}>
      <Switch>
        <Route exact path="/boards" component={BoardList} />
        <Route exact path="/boards/new" component={NewBoard} />
        <Route exact path="/boards/:boardId" component={BoardView} />
        <Redirect from="*" to="/boards" />
      </Switch>
    </Wrapper>
  )
}

export default Boards
