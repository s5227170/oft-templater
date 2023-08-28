import { useEffect, useState } from "react";
import { AiOutlineBorderBottom, AiOutlineBorderLeft, AiOutlineBorderRight, AiOutlineBorderTop } from "react-icons/ai";
import PaddingElement from "../../../UI/PaddingElement/PaddingElement";
import classes from "./Paddings.module.scss";

const Paddings = (props) => {
    const [paddings, setPaddings] = useState({
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
    })

    useEffect(() => {

        if (props.paddings) {
            if (props.paddings != paddings) {
                setPaddings(props.paddings)
            }
        }
    }, [props.paddings])

    const paddingHandler = (e, el) => {
        if (e.target.value.length > 3) {
            e.target.value = +e.target.value.slice(0, 3)
        }
        const newPaddings = { ...paddings, [el]: +e.target.value }

        setPaddings(newPaddings)
        props.extractPaddings(newPaddings)
    }

    return (
        <div className={classes.Padding}>
            <h2 className={classes.Heading}>Component padding:</h2>
            <div className={classes.PaddingInputs}>
                <PaddingElement
                    change={(e) => paddingHandler(e, "paddingLeft")}
                    value={paddings.paddingLeft}
                >
                    <AiOutlineBorderLeft color="#fff" size="40" />
                </PaddingElement>
                <PaddingElement
                    change={(e) => paddingHandler(e, "paddingRight")}
                    value={paddings.paddingRight}
                >
                    <AiOutlineBorderRight color="#fff" size="40" />
                </PaddingElement>
                <PaddingElement
                    change={(e) => paddingHandler(e, "paddingTop")}
                    value={paddings.paddingTop}
                >
                    <AiOutlineBorderTop color="#fff" size="40" />
                </PaddingElement>
                <PaddingElement
                    change={(e) => paddingHandler(e, "paddingBottom")}
                    value={paddings.paddingBottom}
                >
                    <AiOutlineBorderBottom color="#fff" size="40" />
                </PaddingElement>
            </div>
        </div>
    )
}

export default Paddings