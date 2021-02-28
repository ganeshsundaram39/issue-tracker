import React, { useState } from "react"

import "./new-issue.scss"

import Card from "@material-ui/core/Card"
import BugFixing from "../../../assets/images/bug_fixing.svg"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title cannot be greater than 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(50, "Description cannot be greater than 50 characters"),

  images: yup.string().required("Images is required"),
})

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()))
      accept(suggestions)
    }, 250)
  })
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const NewIssue = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  const onSubmit = (formData) => {}
  const [value, setValue] = React.useState("**Hello world!!!**")
  const [selectedTab, setSelectedTab] = React.useState("write")
  const save = async function* (data) {
    console.log({data})
    // var data = new FormData();
    // data.append('image', event.target.files[0]);
    // data.append('username', 'Saurabh'); //if you have other fields

    // axios.post('/api/courses/uploadImage', data)
    // .then( (response) => {
    //  alert(JSON.stringify(response));
    // })
    // .catch(function (error) {
    //  console.log(error);
    // });


    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300"


    // returns true meaning that the save was successful
    return true
  }
  return (
    <div className="new-issue-container">
      <Card className="new-issue-card">
        <h2>New Issue</h2>

        <div className="new-issue-form-wrapper">
          <div className="first">
            <img src={BugFixing} alt="bug fixing" />
          </div>

          <div className="second">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Enter Title"
                name="title"
                type="text"
                error={!!errors.title}
                helperText={
                  errors?.title?.message ? errors?.title?.message : " "
                }
                inputRef={register}
                fullWidth
                variant="filled"
              />

              <hr />
              <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
                loadSuggestions={loadSuggestions}
                childProps={{
                  writeButton: {
                    tabIndex: -1,
                  },
                }}
                paste={{
                  saveImage: save,
                }}
              />
              <hr />

              <div className="buttons top-margin">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginRight: "15px" }}
                >
                  Create Issue
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NewIssue
