import React, { useState } from "react"

import ReactMde from "react-mde"
import * as Showdown from "showdown"
import { getImageUrl } from "../../../state/actions/issue.action"
import { useSnackbar } from "notistack"

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const ReactMarkdownEditor = ({ comment, setComment, setImages }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedTab, setSelectedTab] = useState("write")

  const save = async function* (data) {
    try {
      const res = await getImageUrl(data)
      setImages((pre) => [...pre, res?.data?.cloudinaryId])
      yield res?.data?.url
      return true
    } catch (err) {
      enqueueSnackbar("Not Allowed", { variant: "error" })
      return false
    }
  }

  return (
    <div>
      <ReactMde
        value={comment}
        onChange={setComment}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
    </div>
  )
}

export default ReactMarkdownEditor
