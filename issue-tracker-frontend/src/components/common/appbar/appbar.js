import React, { useCallback, useState, Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import CloseSharpIcon from "@material-ui/icons/CloseSharp"

import { toggleDrawer } from "../../../state/actions/app.action"
import {
  getAllIssues,
  onSearchIssueLoader,
} from "../../../state/actions/issue.action"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import useThrottle from "../useThrottle"
import { useSearchBarStyles } from "./useSearchBarStyles"
import {
  getAllBoards,
  onSearchBoardLoader,
} from "../../../state/actions/board.action"

export default function SearchAppBar({
  pageName,
  isIssue = false,
  isBoard = false,
}) {
  const classes = useSearchBarStyles()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [showSearchSelect, setShowSearchSelect] = useState(false)
  const onSearchIssue = useSelector((state) => state.issue.onSearchIssue)
  const searchedIssues = useSelector((state) => state.issue.searchedIssues)
  const onSearchBoard = useSelector((state) => state.board.onSearchBoard)
  const searchedBoards = useSelector((state) => state.board.searchedBoards)
  const throttledDispatch = useThrottle(dispatch, 500)
  const placeHolderText = isIssue ? "Search Issues..." : "Search Boards..."
  const toggleDrawerFn = useCallback(
    (event) => {
      event.stopPropagation()
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return
      }
      dispatch(toggleDrawer())
    },
    [dispatch]
  )

  const handleChange = (event) => {
    const newValue = event.target.value
    setSearch(newValue)
    if (newValue && newValue.length > 2) {
      setShowSearchSelect(true)
      if (isIssue) {
        dispatch(onSearchIssueLoader())
        throttledDispatch(getAllIssues({ search: newValue }))
      } else {
        dispatch(onSearchBoardLoader())
        throttledDispatch(getAllBoards({ search: newValue }))
      }
    } else {
      setShowSearchSelect(false)
    }
  }
  const clearSearch = () => {
    setSearch("")
    setShowSearchSelect(false)
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawerFn}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {pageName}
          </Typography>
          {isIssue || isBoard ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={placeHolderText}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={handleChange}
                value={search}
                inputProps={{ "aria-label": placeHolderText }}
              />
              {search && (
                <div className={classes.clearIcon} onClick={clearSearch}>
                  <CloseSharpIcon />
                </div>
              )}
              {showSearchSelect && (
                <div className={classes.searchResults}>
                  {(onSearchIssue || onSearchBoard) && (
                    <div style={{ marginBottom: "10px" }}>Loading...</div>
                  )}

                  {isIssue ? (
                    <>
                      {searchedIssues && searchedIssues.length
                        ? searchedIssues.map((issue) => (
                            <Fragment key={issue.issueId}>
                              <Link
                                className={classes.searchResult}
                                to={"/issues/" + issue.issueId}
                              >
                                <span className="issue-title">
                                  {" "}
                                  {issue.title}{" "}
                                </span>
                              </Link>
                            </Fragment>
                          ))
                        : null}
                      {!onSearchIssue &&
                      searchedIssues &&
                      searchedIssues.length === 0 ? (
                        <div style={{ marginBottom: "10px" }}>
                          No Issues Found!
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {searchedBoards && searchedBoards.length
                        ? searchedBoards.map((board) => (
                            <Fragment key={board.boardId}>
                              <Link
                                className={classes.searchResult}
                                to={"/boards/" + board.boardId}
                              >
                                <span className="board-title">
                                  {" "}
                                  {board.title}{" "}
                                </span>
                              </Link>
                            </Fragment>
                          ))
                        : null}
                      {!onSearchBoard &&
                      searchedBoards &&
                      searchedBoards.length === 0 ? (
                        <div style={{ marginBottom: "10px" }}>
                          No Boards Found!
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  )
}
