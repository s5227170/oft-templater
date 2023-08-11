import ContentInput from "../../../TextEditor/ContentInput/ContentInput"
import classes from "./TextContent.module.scss"

const TextContent = (props) => {
  useEffect(() => {
    if (props.submission) {
      let textContent = []
      if (inputData.length) {
        textContent = inputData
      } else if (props.currentContent) {
        textContent = props.currentContent
      } else {
        return props.errorBridge({
          message: "You haven't made any changes.",
          error: true,
        })
      }
      let alignment = ""
      if (componentChoice.topAlign) {
        alignment = "top"
      }
      if (componentChoice.middleAlign) {
        alignment = "middle"
      }
      if (componentChoice.bottomAlign) {
        alignment = "bottom"
      }
      console.log(textContent)
      const allData = {
        type: props.componentType,
        paddingLeft: paddings.paddingLeft,
        paddingRight: paddings.paddingRight,
        paddingTop: paddings.paddingTop,
        paddingBottom: paddings.paddingBottom,
        content: textContent,
        position: props.positionData.item,
        verticalAlign: alignment,
      }
      props.confirmContent(
        props.positionData.row,
        props.positionData.item,
        props.background,
        allData
      )
      props.resetComponent()
    }
  }, [props.submission])

  const dataExtractionHandler = (content) => {
    setInputData(content)
  }
  return (
    <div className={classes.TextContent}>
      <ContentInput
        currentColours={props.currentColours}
        setColours={props.setColours}
        extractData={dataExtractionHandler}
        componentType={props.componentType}
        currentContent={props.currentContent ? props.currentContent : null}
      />
    </div>
  )
}

export default TextContent
