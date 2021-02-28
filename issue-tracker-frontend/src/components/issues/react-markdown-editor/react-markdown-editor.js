import React, { useState, useCallback } from "react"

import ReactMde from "react-mde"
import * as Showdown from "showdown"
import { getImageUrl } from "../../../state/actions/issue.action"

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const ReactMarkdownEditor = useMemo(
  () => ({ description, setDescription, children, setImages }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [selectedTab, setSelectedTab] = useState("write")

    const save = async function* (data) {
      try {
        const res = await getImageUrl(data)

        setImages((pre) => [...pre, res?.data?.cloudinaryId])

        yield res?.data?.url

        return true
      } catch (err) {
        console.log({ err })
        enqueueSnackbar("Not Allowed", { variant: "error" })

        return false
      }
    }

    return (
      <div>
        <ReactMde
          value={description}
          onChange={setDescription}
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
        {children}
      </div>
    )
  }
)

export default ReactMarkdownEditor
