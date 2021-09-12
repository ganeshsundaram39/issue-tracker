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

export default function SearchAppBar({ pageName }) {
  const classes = useSearchBarStyles()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [showSearchSelect, setShowSearchSelect] = useState(false)
  const onSearchIssue = useSelector((state) => state.issue.onSearchIssue)
  const searchedIssues = useSelector((state) => state.issue.searchedIssues)
  const throttledDispatch = useThrottle(dispatch, 500)

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
      dispatch(onSearchIssueLoader())
      throttledDispatch(getAllIssues({ search: newValue }))
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Issues..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              value={search}
              inputProps={{ "aria-label": "search Issues" }}
            />
            {search && (
              <div className={classes.clearIcon} onClick={clearSearch}>
                <CloseSharpIcon />
              </div>
            )}
            {showSearchSelect && (
              <div className={classes.searchResults}>
                {onSearchIssue && (
                  <div style={{ marginBottom: "10px" }}>Loading...</div>
                )}
                {searchedIssues && searchedIssues.length
                  ? searchedIssues.map((issue) => (
                      <Fragment key={issue.issueId}>
                        <Link
                          className={classes.searchResult}
                          to={"/issues/" + issue.issueId}
                        >
                          <span className="issue-title"> {issue.title} </span>
                        </Link>
                      </Fragment>
                    ))
                  : null}
                {!onSearchIssue &&
                searchedIssues &&
                searchedIssues.length === 0 ? (
                  <div style={{ marginBottom: "10px" }}>No Issues Found!</div>
                ) : null}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
