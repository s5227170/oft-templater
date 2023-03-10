import ComponentSummary from "../../UI/ComponentSummary/ComponentSummary";
import classes from "./RowSettingsEditor.module.scss";

const RowSettingsEditor = (props) => {
  return (
    <div className={classes.TextEditor}>
      <div className={classes.Editor}>
        {props.row.contentComponents.length ? (
          props.row.contentComponents.map((component, index) => {
            const componentPaddings = [
              component.paddingLeft,
              component.paddingRight,
              component.paddingTop,
              component.paddingBottom,
            ];
            let refinedContent = [];
            if (component.type == "Text" || component.type == "List") {
              component.content.map((paragraph) => {
                for (let i = 0; i < paragraph.children.length; i++) {
                  refinedContent.push(paragraph.children[i].text);
                }
              });
              return (
                <ComponentSummary
                  key={"component-summary-" + index}
                  type={component.type}
                  paddings={componentPaddings}
                  content={refinedContent}
                  position={component.position}
                  deleteComponent={props.deleteComponent}
                  editComponent={props.editComponent}
                  tackleEditModal={props.tackleEditModal}
                  tackleModal={props.tackleModal}
                  row={props.row}
                />
              );
            } else {
              return (
                <ComponentSummary
                  key={"component-summary-" + index}
                  type={component.type}
                  paddings={componentPaddings}
                  url={component.url}
                  width={component.imgWidth}
                  height={component.imgHeight}
                  position={component.position}
                  deleteComponent={props.deleteComponent}
                  editComponent={props.editComponent}
                  tackleEditModal={props.tackleEditModal}
                  tackleModal={props.tackleModal}
                  row={props.row}
                />
              );
            }
          })
        ) : (
          <label>No content components on this row</label>
        )}
      </div>
    </div>
  );
};

export default RowSettingsEditor;
