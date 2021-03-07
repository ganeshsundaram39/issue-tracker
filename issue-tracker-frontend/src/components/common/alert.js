import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import PropTypes from "prop-types"

export default function AlertDialog({
  children,
  message,
  title,
  handleYes,
  handleNo,
  yesText,
  noText
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (event) => {
    event?.stopPropagation?.()
    setOpen(true)
  }

  const handleClose = (event) => {
    event?.stopPropagation?.()
    setOpen(false)
  }

  return (
    <div>
      {children({ handleClickOpen: handleClickOpen })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>

            {message}

        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              handleNo(event)
              handleClose(event)
            }}
            color="primary"
          >
            {noText}
          </Button>
          <Button
            onClick={(event) => {
              handleYes(event)
              handleClose(event)
            }}
            color="primary"
          >
           {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AlertDialog.propTypes = {
  children: PropTypes.func.isRequired,
  message:   PropTypes.oneOfType([  PropTypes.string.isRequired,PropTypes.object.isRequired]),
  title: PropTypes.string.isRequired,
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  yesText: PropTypes.string.isRequired,
  noText: PropTypes.string.isRequired,
}
AlertDialog.defaultProps = {
  children: () => {},
  message: "Dialog Message",
  title: "Dialog Title",
  handleYes: () => {},
  handleNo: () => {},
  yesText: 'Yes',
  noText: 'No',
}
