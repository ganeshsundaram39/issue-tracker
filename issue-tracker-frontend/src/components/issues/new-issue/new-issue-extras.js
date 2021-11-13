import * as yup from "yup"
import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    "margin-top": "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title cannot be greater than 50 characters"),
})

export const labels = [
  { value: "bug", text: "bug => Something isn't working" },
  {
    value: "documentation",
    text: "documentation => Improvements or additions to documentation",
  },
  {
    value: "duplicate",
    text: "duplicate => This issue or pull request already exists",
  },
  { value: "enhancement", text: "enhancement => New feature or request" },
  { value: "good first issue", text: "good first issue => Good for newcomers" },
  { value: "help wanted", text: "help wanted => Extra attention is needed" },
  { value: "invalid", text: "invalid => This doesn't seem right" },
  { value: "question", text: "question=> Further information is requested" },
  { value: "wontfix", text: "wontfix => This will not be worked on" },
]
