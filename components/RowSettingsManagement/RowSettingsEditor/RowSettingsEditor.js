import ComponentSummary from "../../UI/ComponentSummary/ComponentSummary"
import classes from "./RowSettingsEditor.module.scss"

const RowSettingsEditor = (props) => {

  return (
    <div className={classes.TextEditor}>
      <div className={classes.Editor}>
        {props.row.contentComponents.length ? (
          props.row.contentComponents.map((component, index) => {
            // const componentPaddings = [
            //   component.paddingLeft,
            //   component.paddingRight,
            //   component.paddingTop,
            //   component.paddingBottom,
            // ]
            // let refinedContent = []
            // if (component.type == "Text" || component.type == "List") {
            //   component.content.map((paragraph) => {
            //     for (let i = 0; i < paragraph.children.length; i++) {
            //       refinedContent.push(paragraph.children[i].text)
            //     }
            //   })
            return (
              <ComponentSummary
                key={"component-summary-" + index}
                position={component.position}
                deleteComponent={props.deleteComponent}
                editComponent={() => { props.takeComponent("row" + props.row.position + "#item" + component.position); props.tackleModal() }}
              />
            )
            // } 
            // else {
            //   return (
            //     <ComponentSummary
            //       key={"component-summary-" + index}
            //       position={component.position}
            //       deleteComponent={props.deleteComponent}
            //       editComponent={props.editComponent}
            //     />
            //   )
            // }
          })
        ) : (
          <label>No content components on this row</label>
        )}
      </div>
    </div>
  )
}

export default RowSettingsEditor
