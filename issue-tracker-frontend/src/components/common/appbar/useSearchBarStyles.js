import { fade, makeStyles } from "@material-ui/core/styles"

export const useSearchBarStyles = makeStyles((theme) => ({
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
    top: "1px",
  },
  clearIcon: {
    display: "inline",
    position: "absolute",
    right: "7px",
    cursor: "pointer",
    top: "6px",
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
    display: "flex",
    flexDirection: "column",
    paddingBottom: "40px",
  },
  searchResult: {
    color: "#000",
    display: "inline-block",
    marginBottom: "10px",
  },
}))
