import React, { useCallback } from "react"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { useSelector, useDispatch } from "react-redux"
import { toggleDrawer } from "../../../state/actions/app.action"
import { logoutUser } from "../../../state/actions/auth.action"

import { Link } from "react-router-dom"
import AccountBoxSharpIcon from "@material-ui/icons/AccountBoxSharp"
import InboxSharpIcon from "@material-ui/icons/InboxSharp"
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp"
import { useHistory } from "react-router-dom"
import BugReportIcon from "@material-ui/icons/BugReport"
import AlertDialog from "../alert"
const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
))

export default function Drawer() {
  const drawerIsOpen = useSelector((state) => state.app.drawerIsOpen)
  const dispatch = useDispatch()
  let history = useHistory()

  const toggleDrawerFn = useCallback(
    (event) => {
      event?.stopPropagation?.()
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

  const logoutUserFn = useCallback(
    (event) => {
      event?.stopPropagation?.()

      dispatch(logoutUser())

      localStorage.removeItem("userData")
      history.push("/auth/login")
    },
    [dispatch, history]
  )

  const list = useCallback(
    () => (
      <div
        style={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawerFn}
        onKeyDown={toggleDrawerFn}
      >
        <List>
          <ListItem button component={AdapterLink} to="/issues">
            <ListItemIcon>
              <InboxSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"All Issues"} />
          </ListItem>
        </List>

        <List>
          <ListItem button component={AdapterLink} to="/issues/new">
            <ListItemIcon>
              <BugReportIcon />
            </ListItemIcon>
            <ListItemText primary={"New Issue"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={AdapterLink} to="/profile">
            <ListItemIcon>
              <AccountBoxSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <AlertDialog
            message="Are you sure you want to Logout?"
            title="Logout"
            handleYes={logoutUserFn}
            handleNo={() => {}}
          >
            {({ handleClickOpen }) => (
              <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                  <ExitToAppSharpIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            )}
          </AlertDialog>
        </List>
      </div>
    ),
    [toggleDrawerFn, logoutUserFn]
  )

  return (
    <div>
      <>
        <SwipeableDrawer
          anchor={"left"}
          open={drawerIsOpen}
          onClose={toggleDrawerFn}
          onOpen={toggleDrawerFn}
        >
          {list()}
        </SwipeableDrawer>
      </>
    </div>
  )
}
