import React, { memo } from "react"
import CheckSharpIcon from "@material-ui/icons/CheckSharp"
import "./color.scss"
export const Color = memo(
  ({ colorHash, colorName, primaryColorHash, setPrimaryColor }) => {
    return (
      <div
        className="color-title"
        style={{ backgroundColor: colorHash }}
        onClick={() => setPrimaryColor({ colorHash, colorName })}
      >
        {primaryColorHash === colorHash ? (
          <CheckSharpIcon className="color-title-checked" />
        ) : null}
      </div>
    )
  }
)
