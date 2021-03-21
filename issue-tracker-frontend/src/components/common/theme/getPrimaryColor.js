
import {
  indigo,
  blue,
  red,
  pink,
  purple,
  deepPurple,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from './colors.js'

const getPrimaryColor = ({ colorName = "indigo" }) => {
  switch (colorName) {
    case "indigo":
      return indigo
    case "blue":
      return blue
    case "red":
      return red
    case "pink":
      return pink
    case "purple":
      return purple
    case "deepPurple":
      return deepPurple
    case "lightBlue":
      return lightBlue
    case "cyan":
      return cyan
    case "teal":
      return teal
    case "green":
      return green
    case "lightGreen":
      return lightGreen
    case "lime":
      return lime
    case "amber":
      return amber
    case "yellow":
      return yellow
    case "orange":
      return orange
    case "deepOrange":
      return deepOrange

    default:
      return indigo
  }
}

export default getPrimaryColor
