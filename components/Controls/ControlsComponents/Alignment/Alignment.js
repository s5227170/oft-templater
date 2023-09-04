import { useEffect, useRef, useState } from "react";
import AlignType from "../../../UI/AlignType/AlignType";
import RadioButton from "../../../UI/RadioButton/RadioButton";

import classes from "./alignment.module.scss"


const Alignment = (props) => {
    const [alignmentOption, setAlignmentOption] = useState({
        top: true,
        middle: false,
        bottom: false,
    })
    const [alignment, setAlignment] = useState("top")
    const [initialChecked, setInitialChecked] = useState(false)

    const topRef = useRef(null)
    const middleRef = useRef(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        if (props.alignment.length && !initialChecked) {
            if (props.alignment != alignment) {
                manageChoice(props.alignment)
                setInitialChecked(true)
            }
        }
    }, [props.alignment])

    const buttonChoiceTrigger = (name) => {
        manageChoice(name)
    }

    const typeClickHandler = (type) => {
        switch (type) {
            case 1:
                if (topRef) {
                    topRef.current.click()
                }
                break
            case 2:
                if (middleRef) {
                    middleRef.current.click()
                }
                break
            case 3:
                if (bottomRef) {
                    bottomRef.current.click()
                }
                break
            default: return;
        }
    }

    const manageChoice = (choice) => {
        switch (choice) {
            case "top":
                setAlignmentOption({
                    top: true,
                    middle: false,
                    bottom: false
                })
                setAlignment("top")
                props.extractAlignment("top")
                break
            case "middle":
                setAlignmentOption({
                    top: false,
                    middle: true,
                    bottom: false
                })
                setAlignment("middle")
                props.extractAlignment("middle")
                break
            case "bottom":
                setAlignmentOption({
                    top: false,
                    middle: false,
                    bottom: true
                })
                setAlignment("bottom")
                props.extractAlignment("bottom")
                break
            default: return;
        }
    }

    return (
        <div className={classes.VerticalAlign}>
            <h2>Vertical text align</h2>
            <div className={classes.AlignOptions}>
                <AlignType
                    title="Top alignment"
                    onClick={() => typeClickHandler(1)}
                    confirm={
                        <RadioButton
                            click={() => buttonChoiceTrigger("top")}
                            active={alignmentOption.top}
                            elementRef={topRef}
                        />
                    }
                />
                <AlignType
                    title="Middle alignment"
                    onClick={() => typeClickHandler(2)}
                    confirm={
                        <RadioButton
                            click={() => buttonChoiceTrigger("middle")}
                            active={alignmentOption.middle}
                            elementRef={middleRef}
                        />
                    }
                />
                <AlignType
                    title="Bottom alignment"
                    onClick={() => typeClickHandler(3)}
                    confirm={
                        <RadioButton
                            click={() => buttonChoiceTrigger("bottom")}
                            active={alignmentOption.bottom}
                            elementRef={bottomRef}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default Alignment