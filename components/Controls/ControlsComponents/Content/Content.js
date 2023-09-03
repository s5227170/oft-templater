import { useEffect, useState } from "react"
import ImageEditor from "../../../ImageEditor/ImageEditor"
import MultiImageEditor from "../../../MultiImageEditor/MultiImageEditor"
import TextEditor from "../../../TextEditor/TextEditor"
import classes from "./Content.module.scss"

const Content = (props) => {
    const [submit, setSubmit] = useState(false)
    const [background, setBackground] = useState(props.componentToManage ? props.row.background : null)
    const [position, setPosition] = useState({ row: "", item: "" })
    const [paddings, setPaddings] = useState(null)
    const [contentSize, setContentSize] = useState(0)

    const getContentSize = (size) => {
        setContentSize(size)
    }

    const getPaddings = (commponentPaddings) => {
        setPaddings(commponentPaddings)
    }

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
                        componentType={props.componentType}
                        confirmContent={props.confirmContent}
                    />
                ) : (
                    null
                    // <MultiImageEditor
                    //     componentType={props.componentType}
                    //     confirmContent={props.confirmContent}
                    //     submission={submit}
                    //     positionData={position}
                    //     row={props.row}
                    //     defaultPaddings={props.defaultPaddings}
                    //     columnSize={props.columnSize}
                    //     background={background}
                    //     getPaddings={getPaddings}
                    //     getContentSize={getContentSize}
                    //     resetComponent={() => {
                    //         setSubmit(false)
                    //     }}
                    //     errorBridge={(content) =>
                    //         setmessageContent({ ...messageContent, ...content })
                    //     }
                    // />
                )}
        </div>
    )
}

export default Content