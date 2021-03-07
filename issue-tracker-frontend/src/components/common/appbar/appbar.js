import React, { useCallback, useState, Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import { toggleDrawer } from "../../../state/actions/app.action"
import {
  getAllIssues,
  onSearchIssueLoader,
} from "../../../state/actions/issue.action"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import useThrottle from "../useThrottle"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "250px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  searchResults: {
    width: "inherit",
    background: "white",
    position: "fixed",
    zIndex: 999999,
    border: "1px solid #ccc",
    padding: "10px 5px 0 5px",
    color: "black",
  },
  searchResult: {
    color: "#000",
    display: "inline-block",
    marginBottom: "10px",
  },
}))

export default function SearchAppBar({ pageName }) {
  const classes = useStyles()
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
              placeholder="Search Issue..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              value={search}
              inputProps={{ "aria-label": "search issue" }}
            />
            {showSearchSelect && (
              <div
                className={classes.searchResults}
                onMouseEnter={() => setShowSearchSelect(true)}
                onMouseLeave={() => setShowSearchSelect(false)}
              >
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
