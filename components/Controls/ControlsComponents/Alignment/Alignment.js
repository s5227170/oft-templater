import { useRef, useState } from "react";
import AlignType from "../../../UI/AlignType/AlignType";
import RadioButton from "../../../UI/RadioButton/RadioButton";

import classes from "./Alignment.module.scss"


const Alignment = (props) => {
    const [componentChoice, setComponentChoice] = useState({
        topAlign: true,
        middleAlign: false,
        bottomAlign: false,
    })

    const topAlignRef = useRef(null)
    const middleAlignRef = useRef(null)
    const bottomAlignRef = useRef(null)

    const buttonChoiceTrigger = (name) => {
        const newComponentChoice = Object.assign({}, componentChoice)
        for (let el in newComponentChoice) {
            newComponentChoice[el] = false
        }
        newComponentChoice[name] = true
        setComponentChoice(newComponentChoice)
    }

    const typeClickHandler = (type) => {
        if (type == 1) {
            if (topAlignRef) {
                topAlignRef.current.click()
            }
        }
        if (type == 2) {
            if (middleAlignRef) {
                middleAlignRef.current.click()
            }
        }
        if (type == 3) {
            if (bottomAlignRef) {
                bottomAlignRef.current.click()
            }
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
                            click={() => buttonChoiceTrigger("topAlign")}
                            active={componentChoice.topAlign}
                            elementRef={topAlignRef}
                        />
                    }
                />
                <AlignType
                    title="Middle alignment"
                    onClick={() => typeClickHandler(2)}
                    confirm={
                        <RadioButton
                            click={() => buttonChoiceTrigger("middleAlign")}
                            active={componentChoice.middleAlign}
                            elementRef={middleAlignRef}
                        />
                    }
                />
                <AlignType
                    title="Bottom alignment"
                    onClick={() => typeClickHandler(3)}
                    confirm={
                        <RadioButton
                            click={() => buttonChoiceTrigger("bottomAlign")}
                            active={componentChoice.bottomAlign}
                            elementRef={bottomAlignRef}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default Alignment