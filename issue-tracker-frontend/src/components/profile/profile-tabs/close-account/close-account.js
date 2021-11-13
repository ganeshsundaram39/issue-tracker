import React, { useEffect, useCallback } from "react"

import Button from "@material-ui/core/Button"
import "./close-account.scss"
import AlertDialog from "../../../common/alert"
import { useSnackbar } from "notistack"
import {
  closeAccount,
  resetUpdateProfileData,
} from "../../../../state/actions/auth.action"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setPrimaryColor } from "../../../../state/actions/app.action"

const CloseAccount = ({ userId }) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  let history = useHistory()

  const onCloseAccount = useSelector((state) => state.auth.onCloseAccount)
  const onCloseAccountResponse = useSelector(
    (state) => state.auth.onCloseAccountResponse
  )

  const closeAccountCallback = useCallback(
    (event) => {
      event?.stopPropagation?.()
      dispatch(closeAccount({ userId }))
    },
    [dispatch, userId]
  )

  useEffect(() => {
    if (!onCloseAccount && onCloseAccountResponse) {
      if (onCloseAccountResponse?.error && onCloseAccountResponse?.message) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      } else if (onCloseAccountResponse?.data) {
        dispatch(setPrimaryColor({ colorHash: "#3f51b5", colorName: "indigo" }))
        enqueueSnackbar("Account Closed!", { variant: "success" })
        localStorage.removeItem("userData")
        history.push("/auth/login")
      }
      dispatch(resetUpdateProfileData())
    }
  }, [
    onCloseAccount,
    onCloseAccountResponse,
    enqueueSnackbar,
    dispatch,
    history,
  ])
  return (
    <div className="close-account">
      <p>
        Once you delete this account, there is no going back. Please be certain.
      </p>
      <div className="buttons bottom-margin">
        <AlertDialog
          message="Are you sure you want to close this account?"
          title="Logout"
          handleYes={closeAccountCallback}
          handleNo={() => {}}
        >
          {({ handleClickOpen }) => (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Close
            </Button>
          )}
        </AlertDialog>
      </div>
    </div>
  )
}

export default CloseAccount
