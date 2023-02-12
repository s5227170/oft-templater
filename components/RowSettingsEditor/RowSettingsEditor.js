import { useState, useEffect } from "react";
import ComponentSummary from "../UI/ComponentSummary/ComponentSummary";
import classes from "./RowSettingsEditor.module.scss";

const RowSettingsEditor = (props) => {

    return (
        <div className={classes.TextEditor}>
            <div className={classes.Editor}>

                {props.row.contentComponents.length ?
                    props.row.contentComponents.map(component => {
                        const componentPaddings = [component.paddingLeft, component.paddingRight, component.paddingTop, component.paddingBottom];
                        let refinedContent = [];
                        if (component.type == "Text" || component.type == "List") {
                            component.content.map((paragraph) => {
                                for (let i = 0; i < paragraph.children.length; i++) {
                                    refinedContent.push(paragraph.children[i].text);
                                }
                            })
                            return <ComponentSummary type={component.type} paddings={componentPaddings} content={refinedContent} position={component.position} />
                        } else {
                            return <ComponentSummary type={component.type} paddings={componentPaddings} url={component.url} width={component.imgWidth} height={component.imgHeight} position={component.position} />
                        }
                    })
                    :
                    <label>No content components on this row</label>
                }
            </div>
        </div>
    );
};

export default RowSettingsEditor;
