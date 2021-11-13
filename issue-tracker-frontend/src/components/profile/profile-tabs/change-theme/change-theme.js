import React, { useCallback, useEffect } from "react"
import { primaryColorsArray } from "../../../common/theme/colors"
import { useSnackbar } from "notistack"
import "./change-theme.scss"
import { useSelector, useDispatch } from "react-redux"
import {
  setPrimaryColor,
  savePrimaryColor,
  resetSavePrimaryColor,
} from "../../../../state/actions/app.action"
import { Color } from "./color/color"
import Button from "@material-ui/core/Button"

const ChangeTheme = ({ userId }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)

  const onSavePrimaryColor = useSelector(
    (state) => state.app.onSavePrimaryColor
  )
  const onSavePrimaryColorResponse = useSelector(
    (state) => state.app.onSavePrimaryColorResponse
  )

  const setPrimaryColorCallback = useCallback(
    ({ colorHash, colorName }) => {
      dispatch(setPrimaryColor({ colorHash, colorName }))
      dispatch(
        savePrimaryColor({
          colorHash: colorHash,
          colorName: colorName,
          userId,
        })
      )
    },
    [dispatch, userId]
  )

  useEffect(() => {
    if (!onSavePrimaryColor && onSavePrimaryColorResponse) {
      if (
        onSavePrimaryColorResponse?.error &&
        onSavePrimaryColorResponse?.message
      ) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      } else if (onSavePrimaryColorResponse?.data) {
        enqueueSnackbar("Theme Saved!", { variant: "success" })
      }
      dispatch(resetSavePrimaryColor())
    }
  }, [
    onSavePrimaryColor,
    onSavePrimaryColorResponse,
    enqueueSnackbar,
    dispatch,
  ])

  return (
    <div className="change-theme-wrapper">
      <div className="colors">
        {primaryColorsArray.map((color) => (
          <Color
            colorHash={color?.colorHash}
            key={color?.colorHash}
            colorName={color?.colorName}
            primaryColorHash={primaryColorHash}
            setPrimaryColor={setPrimaryColorCallback}
          />
        ))}
        <div className="buttons  top-margin bottom-margin">
          <Button
            variant="contained"
            onClick={() =>
              setPrimaryColorCallback({
                colorHash: "#3f51b5",
                colorName: "indigo",
              })
            }
            color="primary"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangeTheme
