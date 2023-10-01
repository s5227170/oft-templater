import {  useState } from "react"
import ImageEditor from "../../../ImageEditor/ImageEditor"
import TextEditor from "../../../TextEditor/TextEditor"
import classes from "./Content.module.scss"

const Content = (props) => {
    // const [submit, setSubmit] = useState(false)
    // const [background, setBackground] = useState(
    //     props.componentToManage ? props.row.background : null
    // )
    // const [position, setPosition] = useState({ row: "", item: "" })
    // const [paddings, setPaddings] = useState(null)
    // const [contentSize, setContentSize] = useState(0)

    // const getContentSize = (size) => {
    //     setContentSize(size)
    // }

    // const getPaddings = (commponentPaddings) => {
    //     setPaddings(commponentPaddings)
    // }

    return (
        <div className={classes.Content}>
            {props.type == "Text" ? (
                <TextEditor
                    extractContent={props.extractContent}
                    content={props.content}
                />
            )
                : props.type == "Image" ? (
                    <ImageEditor
                        extractContent={props.extractContent}
                        content={props.content}
                    />
                ) : (
                    null
                )}
        </div>
    )
}

export default Content
