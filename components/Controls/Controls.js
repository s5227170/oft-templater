import ControlsTabs from "../ControlsTabs/ControlsTabs"
import Paddings from "./ControlsComponents/Paddings/Paddings"
import classes from "./Controls.module.scss"
import Alignment from "./ControlsComponents/Alignment/Alignment"
import Content from "./ControlsComponents/Content/Content"
import { useEffect, useState } from "react"

import { BsCheckLg } from "react-icons/bs"

const Controls = (props) => {
  const [refinedComponentToManage, setRefinedComponentToManage] = useState(null)
  const [localConfig, setLocalConfig] = useState(null)
  const [row, setRow] = useState(null)
  const [remainingWidth, setRemainingWidth] = useState(0)

  useEffect(() => {
    if (props.componentToManage) {
      if (props.config) {
        setLocalConfig(props.config)
      }

      const positioning = findPosition(props.componentToManage)

      let foundComponent
      props.config.content.map((row, index) => {
        if (row.position == positioning.rowToFind) {
          foundComponent = row.contentComponents.find(
            (item) => item.position == positioning.itemToFind
          )
          setRow(row)
          setRefinedComponentToManage(foundComponent)
        }
      })
    }
  }, [props.componentToManage, props.config])

  useEffect(() => {
    if (props.componentToManage) {
      const positioning = findPosition(props.componentToManage)

      let foundComponent
      localConfig.content.map((row, rowIndex) => {
        if (row.position == positioning.rowToFind) {
          foundComponent = row.contentComponents.find(
            (item) => item.position == positioning.itemToFind
          )
          if (foundComponent != refinedComponentToManage) {
            let foundComponentIndex
            props.config.content[rowIndex].contentComponents.map(
              (item, index) => {
                if (item.position == positioning.itemToFind) {
                  foundComponentIndex = index
                }
              }
            )
            const updatedConfig = {...localConfig}
            // setLocalConfig({...localConfig, localConfig.content[rowIndex].contentComponents[foundComponentIndex]: refinedComponentToManage})
            
            
            //Currently, the update works, but that isn't properly implemented. The state isn't updated through setLocalConfig, but through the line bellow.


            updatedConfig.content[rowIndex].contentComponents[
              foundComponentIndex
            ] = refinedComponentToManage

            console.log(updatedConfig)
            // setLocalConfig(updatedConfig)
          }
        }
      })
    }
  }, [refinedComponentToManage])

  const getSizeFromRow = (row, position) => {
    let size
    if (row) {
      const pairs = Object.entries(row.columnSizes)
      pairs.map((item, index) => {
        if (item[0][item[0].length - 1] == position) {
          return (size = item[1])
        }
      })
    }
    return size
  }

  const modeContent = (foundComponent) => {
    switch (foundComponent.type) {
      case "Image":
        return {
          content: {
            hyperlink: refinedComponentToManage.hyperlink,
            imgHeight: refinedComponentToManage.imgHeight,
            imgWidth: refinedComponentToManage.imgWidth,
            url: refinedComponentToManage.url,
            paddings: refinedComponentToManage.paddings,
          },
          size: getSizeFromRow(row, refinedComponentToManage.position),
          paddings: refinedComponentToManage.paddings,
        }
      // break;
      case "Text":
        return {
          content: refinedComponentToManage.content,
        }
      // break;
      default:
        return
    }
  }

  const clickHandler = () => {
    if (remainingWidth > 0) {
      return alert("There is still available width that requires to be set")
      // setmessageContent({
      //   ...messageContent,
      //   message: "There is still available width that requires to be set",
      //   error: true,
      // })
    }
    if (remainingWidth < 0) {
      return alert("Set sizes exceed the size of the component")
      // setmessageContent({
      //   ...messageContent,
      //   message: "Set sizes exceed the size of the component",
      //   error: true,
      // })
    }
    const newConfig = {
      ...localConfig,
    }
    props.extractChanges(newConfig)
  }

  const extractPaddings = (paddings) => {
    setRefinedComponentToManage((refinedComponentToManage) => ({
      ...refinedComponentToManage,
      paddings: paddings,
    }))
  }

  const extractAlignment = (alignment) => {
    setRefinedComponentToManage((refinedComponentToManage) => ({
      ...refinedComponentToManage,
      verticalAlign: alignment,
    }))
  }

  const extractContent = (content, type, currentWidth) => {
    switch (type) {
      case "Text":
        setRefinedComponentToManage((refinedComponentToManage) => ({
          ...refinedComponentToManage,
          content: content,
        }))
        break
      case "Image":
        setRefinedComponentToManage(
          (refinedComponentToManage, currentWidth) => ({
            ...refinedComponentToManage,
            hyperlink: content.hyperlink,
            url: content.url,
            imgWidth: content.imgWidth,
            imgHeight: content.imgHeight,
          })
        )
        setRemainingWidth(currentWidth)
        break
      default:
        return
    }
  }

  const findPosition = (elementPosition) => {
    const rowToFind = elementPosition.split("#")[0].substr(3)

    const itemToFind = elementPosition
      .split("#")[1]
      .charAt(elementPosition.split("#")[1].length - 1)

    return { rowToFind, itemToFind }
  }

  const tabs = [
    {
      name: "Content",
      content: refinedComponentToManage ? (
        <Content
          content={modeContent(refinedComponentToManage)}
          extractContent={extractContent}
          type={refinedComponentToManage.type}
        />
      ) : (
        <></>
      ),
    },
    {
      name: "Padding",
      content: refinedComponentToManage ? (
        <Paddings
          paddings={refinedComponentToManage.paddings}
          extractPaddings={extractPaddings}
        />
      ) : (
        <></>
      ),
    },
    {
      name: "Alignment",
      content: refinedComponentToManage ? (
        <Alignment
          alignment={refinedComponentToManage.verticalAlign}
          extractAlignment={extractAlignment}
        />
      ) : (
        <></>
      ),
    },
  ]

  return (
    <div className={classes.ControlsWrapper}>
      <div className={classes.Header} onClick={clickHandler}>
        <h1>
          {props.componentToManage && refinedComponentToManage
            ? " Row " +
              findPosition(props.componentToManage).rowToFind.toString() +
              " Item " +
              findPosition(props.componentToManage).itemToFind.toString() +
              " - " +
              refinedComponentToManage.type.toString()
            : "No chosen component"}
        </h1>
        <button>
          Confirm changes
          <BsCheckLg color="#101418" size="20" />
        </button>
      </div>
      <hr></hr>
      <div className={classes.Content}>
        <ControlsTabs
          tabHeaders={tabs.map((tab) => tab.name)}
          tabContent={tabs.map((tab) => tab.content)}
        />
      </div>
    </div>
  )
}

export default Controls
