import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import RadioButton from "../../UI/RadioButton/RadioButton"
import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons"

import classes from "./CreateRowContent.module.scss"
import CustomInput from "../../UI/CustomInput/CustomInput"
import ResultHandler from "../../ResultHandler/ResultHandler"

const CreateRowContent = (props) => {
  const [rowConfig, setRowConfig] = useState({
    single: false,
    double: false,
    triple: false,
    quadruple: false,
  })
  const btnOneRef = useRef(null)
  const btnTwoRef = useRef(null)
  const btnThreeRef = useRef(null)
  const btnFourRef = useRef(null)
  const [customColumnsSize, setCustomColumnsSize] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [messageContent, setmessageContent] = useState({
    message: "",
    success: false,
    error: false,
    local: false,
  })
  const rowColors = {
    1: "#40cd9a",
    2: "#008dd7",
    3: "#ce4045",
    4: "#CE40A3",
  }

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow)
    }, 250)
  }

  const buttonChoiceTrigger = (name) => {
    const newRowConfig = Object.assign({}, rowConfig)
    for (let el in newRowConfig) {
      newRowConfig[el] = false
    }
    newRowConfig[name] = true
    setRowConfig(newRowConfig)
  }

  const getChoice = () => {
    for (let i = 1; i <= Object.keys(customColumnsSize).length; i++) {}
    for (let choice in rowConfig) {
      if (rowConfig[choice] === true) {
        console.log(choice)
        if (choice == "single") {
          return 1
        }
        if (choice == "double") {
          return 2
        }
        if (choice == "triple") {
          return 3
        }
        if (choice == "quadruple") {
          return 4
        }
      }
    }
  }

  const rowClickHandler = (row) => {
    if (row == 1) {
      if (btnOneRef) {
        btnOneRef.current.click()
        setCustomColumnsSize(null)
        setCustomColumnsSize({ col1: 600 })
      }
    }
    if (row == 2) {
      if (btnTwoRef) {
        btnTwoRef.current.click()
        const colSizes = []
        setCustomColumnsSize(null)
        setCustomColumnsSize({ col1: 300, col2: 300 })
      }
    }
    if (row == 3) {
      if (btnThreeRef) {
        btnThreeRef.current.click()
        setCustomColumnsSize(null)
        setCustomColumnsSize({ col1: 200, col2: 200, col3: 200 })
      }
    }
    if (row == 4) {
      if (btnFourRef) {
        btnFourRef.current.click()
        setCustomColumnsSize(null)
        setCustomColumnsSize({ col1: 150, col2: 150, col3: 150, col4: 150 })
      }
    }
  }

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault()
    }
  }

  const sizeChangeHandler = (e, position) => {
    if (e.target.value > 600) {
      e.target.value = 600
    }
    if (position == 1) {
      setCustomColumnsSize({
        ...customColumnsSize,
        col1: Number(e.target.value),
      })
    }
    if (position == 2) {
      setCustomColumnsSize({
        ...customColumnsSize,
        col2: Number(e.target.value),
      })
    }
    if (position == 3) {
      setCustomColumnsSize({
        ...customColumnsSize,
        col3: Number(e.target.value),
      })
    }
    if (position == 4) {
      setCustomColumnsSize({
        ...customColumnsSize,
        col4: Number(e.target.value),
      })
    }
  }

  useEffect(() => {
    if (messageContent.message.length) {
      tackleModal()
    }
  }, [messageContent.message])

  return (
    <div className={classes.CreateRowContent}>
      <h1 className={classes.Title}>Choose a row type</h1>
      <div className={classes.RowType} onClick={() => rowClickHandler(1)}>
        <div className={classes.Generalinfo}>
          <label>Single-column</label>
          {/* <img src={Single} /> */}
          <Image src="/images/Single.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("single")}
          active={rowConfig.single}
          elementRef={btnOneRef}
        ></RadioButton>
      </div>
      <div className={classes.RowType} onClick={() => rowClickHandler(2)}>
        <div className={classes.Generalinfo}>
          <label>Double-column</label>
          {/* <img src={Double} /> */}
          <Image src="/images/Double.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("double")}
          active={rowConfig.double}
          elementRef={btnTwoRef}
        ></RadioButton>
      </div>
      <div className={classes.RowType} onClick={() => rowClickHandler(3)}>
        <div className={classes.Generalinfo}>
          <label>Triple-column</label>
          {/* <img src={Triple} /> */}
          <Image src="/images/Triple.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("triple")}
          active={rowConfig.triple}
          elementRef={btnThreeRef}
        ></RadioButton>
      </div>
      <div className={classes.RowType} onClick={() => rowClickHandler(4)}>
        <div className={classes.Generalinfo}>
          <label>Quadruple-column</label>
          {/* <img src={Triple} /> */}
          <Image src="/images/Quadruple.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("quadruple")}
          active={rowConfig.quadruple}
          elementRef={btnFourRef}
        ></RadioButton>
      </div>
      {rowConfig.double || rowConfig.triple || rowConfig.quadruple ? (
        <div className={classes.RowSizes}>
          <h2>Custom columns sizes</h2>
          <p>Note: Minimum column width is 100 pixels</p>
          <p>Note: Overall value should be less than 600 pixels</p>
          {rowConfig.double
            ? [1, 2].map((row, index) => {
                return (
                  <div key={index} className={classes.SizeWrapper}>
                    <label>Row {index + 1} width</label>
                    <CustomInput
                      onKeyDown={preventMinus}
                      style={{ width: "50px" }}
                      type="number"
                      min={0}
                      max={600}
                      maxLength={3}
                      onChange={(e) => sizeChangeHandler(e, index + 1)}
                      value={customColumnsSize["col" + (index + 1)]}
                      // disabled={}
                    />
                  </div>
                )
              })
            : rowConfig.triple
            ? [1, 2, 3].map((row, index) => {
                return (
                  <div key={index} className={classes.SizeWrapper}>
                    <label>Row {index + 1} width</label>
                    <CustomInput
                      onKeyDown={preventMinus}
                      style={{ width: "50px" }}
                      type="number"
                      min={0}
                      max={600}
                      maxLength={3}
                      onChange={(e) => sizeChangeHandler(e, index + 1)}
                      value={customColumnsSize["col" + (index + 1)]}
                      // disabled={}
                    />
                  </div>
                )
              })
            : rowConfig.quadruple
            ? [1, 2, 3, 4].map((row, index) => {
                return (
                  <div key={index} className={classes.SizeWrapper}>
                    <label>Row {index + 1} width</label>
                    <CustomInput
                      onKeyDown={preventMinus}
                      style={{ width: "50px" }}
                      type="number"
                      min={0}
                      max={600}
                      maxLength={3}
                      onChange={(e) => sizeChangeHandler(e, index + 1)}
                      value={customColumnsSize["col" + (index + 1)]}
                      // disabled={}
                    />
                  </div>
                )
              })
            : null}
        </div>
      ) : null}
      {rowConfig.single ||
      rowConfig.double ||
      rowConfig.triple ||
      rowConfig.quadruple ? (
        <div className={classes.RowPreview}>
          {rowConfig.single
            ? [1].map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${customColumnsSize["col" + (index + 1)]}px`,
                      height: "100%",
                      backgroundColor: rowColors[(index + 1).toString()],
                    }}
                  >
                    {customColumnsSize["col" + (index + 1)] >= 100
                      ? "Row " + (index + 1)
                      : null}
                  </div>
                )
              })
            : rowConfig.double
            ? [1, 2].map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${customColumnsSize["col" + (index + 1)]}px`,
                      height: "100%",
                      backgroundColor: rowColors[(index + 1).toString()],
                    }}
                  >
                    {customColumnsSize["col" + (index + 1)] >= 100
                      ? "Row " + (index + 1)
                      : null}
                  </div>
                )
              })
            : rowConfig.triple
            ? [1, 2, 3].map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${customColumnsSize["col" + (index + 1)]}px`,
                      height: "100%",
                      backgroundColor: rowColors[(index + 1).toString()],
                    }}
                  >
                    {customColumnsSize["col" + (index + 1)] >= 100
                      ? "Row " + (index + 1)
                      : null}
                  </div>
                )
              })
            : rowConfig.quadruple
            ? [1, 2, 3, 4].map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${customColumnsSize["col" + (index + 1)]}px`,
                      height: "100%",
                      backgroundColor: rowColors[(index + 1).toString()],
                    }}
                  >
                    {customColumnsSize["col" + (index + 1)] >= 100
                      ? "Row " + (index + 1)
                      : null}
                  </div>
                )
              })
            : null}
        </div>
      ) : null}
      {messageContent.message.length ? (
        <ResultHandler
          tackleModal={() => tackleModal()}
          modalShow={modalShow}
          message={messageContent}
          clearMessage={() =>
            setmessageContent({
              message: "",
              success: false,
              error: false,
              local: false,
            })
          }
        />
      ) : null}
      <ConfirmationButtons
        confirm={"Confirm"}
        cancel={"Cancel"}
        confirmClick={() => {
          if (
            !rowConfig.single &&
            !rowConfig.double &&
            !rowConfig.triple &&
            !rowConfig.quadruple
          ) {
            return setmessageContent({
              ...messageContent,
              message: "Please choose a row type",
              error: true,
            })
          }
          let overallValue = 0
          for (let i = 1; i <= Object.keys(customColumnsSize).length; i++) {
            if (customColumnsSize["col" + i] < 70) {
              return setmessageContent({
                ...messageContent,
                message: "Minimum column width is 100 pixels",
                error: true,
              })
            }
            overallValue += customColumnsSize["col" + i]
          }
          if (overallValue > 600) {
            return setmessageContent({
              ...messageContent,
              message: "Overall columns width cannot exceed 600 pixels",
              error: true,
            })
          }
          props.confirmHandler(getChoice(), customColumnsSize)
          props.successFunction()
        }}
        cancelClick={props.cancelHandler}
      />
    </div>
  )
}

export default CreateRowContent
