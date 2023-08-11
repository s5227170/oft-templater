/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import Head from "next/head"

import { MdArrowDropDownCircle } from "react-icons/md"

import Canvas from "../components/Canvas/Canvas"
import Menu from "../components/Menu/Menu"
import TitleContentManager from "../components/TitleManagement/TitleContentManager/TitleContentManager"
import HigherManagementButton from "../components/UI/HigherManagementButton/HigherManagementButton"
import DefaultPaddingManager from "../components/DefaultPaddingManagement/DefaultPaddingManager/DefaultPaddingManager"
import NewCanvasManager from "../components/NewCanvasManagement/NewCanvasManager/NewCanvasManager"

import boilerplate from "../content-components/boilerplate"
import downloadFile from "../util/download-file"

import classes from "../styles/global.module.scss"
import TabbedContent from "../components/UI/TabbedContent/TabbedContent"
import SaveTemplateManager from "../components/SaveTemplateManagement/SaveTemplateManager/SaveTemplateManager"
import LoadTemplateManager from "../components/LoadTemplateManagement/LoadTemplateManager/LoadTemplateManager"
import { tabs } from "../util/tab-config"
import ResultHandler from "../components/ResultHandler/ResultHandler"
import Controls from "../components/Controls/Controls"

export default function Home() {
  const [htmlContentString, setHtmlContentString] = useState(``)
  const [currentPageConfig, setCurrentPageConfig] = useState()
  const [resetCanvas, setResetCanvas] = useState(false)
  const [loadedTemplate, setLoadedTemplate] = useState(null)
  const [templateList, setTemplateList] = useState({
    templates: [],
    loading: false,
  })
  const [emailTitle, setEmailTitle] = useState("")
  const [guideExpand, setGuideExpand] = useState(false)
  const [defaultComponentPadding, setDefaultComponentPadding] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  })
  const [messageContent, setmessageContent] = useState({
    message: "",
    success: false,
    error: false,
    local: false,
  })
  const [tabChange, setTabChange] = useState(false);

  const [titleModalShow, setTitleModalShow] = useState(false)
  const [defaultPaddingModalShow, setDefaultPaddingModalShow] = useState(false)
  const [newCanvasShow, setNewCanvasShow] = useState(false)
  const [saveTemplateShow, setSaveTemplateShow] = useState(false)
  const [loadTemplateShow, setLoadTemplateShow] = useState(false)
  const [messageHandlerShow, setmessagegeHandlerShow] = useState(false)
  const [componentToManage, setComponentToManage] = useState(null)
  const [managedComponent, setManagedComponent] = useState(null)

  console.log(currentPageConfig)

  const tabConfig = tabs

  const tackleModal = (type) => {
    switch (type) {
      case "Title":
        setTimeout(() => {
          setTitleModalShow(!titleModalShow)
        }, 250)
        break
      case "DefaultPadding":
        setTimeout(() => {
          setDefaultPaddingModalShow(!defaultPaddingModalShow)
        }, 250)
        break
      case "NewCanvas":
        setTimeout(() => {
          setNewCanvasShow(!newCanvasShow)
        }, 250)
        break
      case "SaveTemplate":
        setTimeout(() => {
          setSaveTemplateShow(!saveTemplateShow)
        }, 250)
        break
      case "LoadTemplate":
        setTimeout(() => {
          setLoadTemplateShow(!loadTemplateShow)
        }, 250)
        break
    }
  }

  const exportHtmlHandler = async () => {
    if (!htmlContentString.length) {
      return setmessageContent({
        message: "No content to export.",
        success: false,
        error: true,
        local: false,
      })
    }
    const submitContent = boilerplate(
      htmlContentString ? htmlContentString : "No data",
      emailTitle ? emailTitle : "HTML title"
    )
    fetch("http://localhost:3000/api/html", {
      method: "POST",
      body: JSON.stringify({
        content: submitContent,
        subject: emailTitle ? emailTitle : "HTML title",
      }),
    }).then(async (response) => {
      if (response) {
        fetch(`http://localhost:3000/api/getHtml/${emailTitle ? emailTitle : "HTML title"}`, {
          method: "GET",
        }).then(async (data) => {
          downloadFile(data, emailTitle ? emailTitle : "HTML title", "zip")
        })
      }
    })
  }

  const saveHtmlHandler = async (filename) => {
    if (!currentPageConfig.content.length) {
      return setmessageContent({
        message: "No content to save.",
        success: false,
        error: true,
        local: true,
      })
    }

    fetch("http://localhost:3000/api/saveHtml", {
      method: "POST",
      body: JSON.stringify({
        content: currentPageConfig,
        filename: filename,
      }),
    }).then(async (response) => {
      if (response.status == 200) {
        setSaveTemplateShow(!saveTemplateShow)
        return setmessageContent({
          message: "Template has been successfully saved.",
          success: true,
          error: false,
          local: false,
        })
      }
    })
  }

  const loadListHtmlHandler = async () => {
    setTemplateList({ ...templateList.templates, loading: true })
    fetch("http://localhost:3000/api/listTemplates", {
      method: "GET",
    }).then(async (response) => {
      const refiendResponse = await response.json()
      setTemplateList({ templates: refiendResponse.templates, loading: false })
    })
    // if (!templateList.length) {
    //   setTemplateList({ templates: [], loading: false })
    // }
  }

  const loadHtmlHandler = async (filename) => {
    fetch("http://localhost:3000/api/getTemplate", {
      method: "POST",
      body: JSON.stringify({ filename: filename }),
    }).then(async (template) => {
      const loadedPageConfig = await template.json()
      setLoadedTemplate({ ...loadedPageConfig })
      setLoadTemplateShow(!loadTemplateShow)
      return setmessageContent({
        message: "Template has been loaded.",
        success: true,
        error: false,
        local: false,
      })
    })
  }

  const confirmDefaultPadding = (setPaddings) => {
    setDefaultComponentPadding({
      paddingLeft: setPaddings.paddingLeft,
      paddingRight: setPaddings.paddingRight,
      paddingTop: setPaddings.paddingTop,
      paddingBottom: setPaddings.paddingBottom,
    })
  }

  const resetComponentManagement = () => {
    setManagedComponent(null)
    setComponentToManage(null)
  }

  useEffect(() => {
    if (messageContent.message) {
      setmessagegeHandlerShow(!messageHandlerShow)
    }
  }, [messageContent])

  useEffect(() => {
    if (emailTitle) {
      const applyTitleToPageConfig = {
        ...currentPageConfig,
        title: emailTitle
      }
      setCurrentPageConfig(applyTitleToPageConfig)
      console.log("test")
    }
  }, [emailTitle])


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu tackleModal={tackleModal} />
        <div
          className={classes.Guide}
          style={{
            height: guideExpand ? "fit-content" : "50px",
            transition: ".2s",
          }}
        >
          <MdArrowDropDownCircle
            className={classes.DropdownToggle}
            color="#40cd9a"
            size="30"
            onClick={() => setGuideExpand(!guideExpand)}
            style={{
              transform: guideExpand ? "rotate(180deg)" : "rotate(0deg)",
              transition: ".2s",
            }}
          />
          <h1>Guide</h1>
          <TabbedContent contents={tabConfig} changeDetect={setTabChange} changeDetectValue={tabChange} />
        </div>
        <div className={classes.Export}>
          <HigherManagementButton submitHandler={exportHtmlHandler}>
            Export HTML
          </HigherManagementButton>
        </div>
        <div className={classes.Save}>
          <HigherManagementButton
            submitHandler={() => setSaveTemplateShow(!saveTemplateShow)}
          >
            Save template
          </HigherManagementButton>
        </div>
        <div className={classes.Load}>
          <HigherManagementButton
            submitHandler={() => {
              setLoadTemplateShow(!loadTemplateShow), loadListHtmlHandler()
            }}
          >
            Load template
          </HigherManagementButton>
        </div>

        <div className={classes.Workplace}>
          <Controls config={currentPageConfig} extractChanges={setCurrentPageConfig} componentToManage={componentToManage} managedComponent={setManagedComponent} />
          <Canvas
            setHTML={setHtmlContentString}
            defaultComponentPaddings={defaultComponentPadding}
            newCanvas={resetCanvas}
            resetCanvasSetting={setResetCanvas}
            guideExpand={guideExpand}
            tabChange={tabChange}
            loadedTemplate={loadedTemplate}
            resetLoadedTemplate={setLoadedTemplate}
            extractPageConfig={setCurrentPageConfig}
            configChanges={currentPageConfig}
            takeComponent={setComponentToManage}
            receiveComponent={managedComponent}
            resetComponent={resetComponentManagement}
          />
        </div>
        <TitleContentManager
          tackleModal={() => tackleModal("Title")}
          modalShow={titleModalShow}
          confirmTitle={setEmailTitle}
          title={emailTitle}
        />
        <DefaultPaddingManager
          tackleModal={() => tackleModal("DefaultPadding")}
          modalShow={defaultPaddingModalShow}
          confirmDefaultPadding={confirmDefaultPadding}
          defaultComponentPaddings={defaultComponentPadding}
        />
        <NewCanvasManager
          tackleModal={() => tackleModal("NewCanvas")}
          modalShow={newCanvasShow}
          confirmHandler={setResetCanvas}
        />
        <SaveTemplateManager
          tackleModal={() => tackleModal("SaveTemplate")}
          modalShow={saveTemplateShow}
          confirmSave={saveHtmlHandler}
          error={setmessageContent}
          message={messageContent}
          clearmessage={() =>
            setmessageContent({
              message: "",
              success: false,
              error: false,
              local: false,
            })
          }
        />

        <LoadTemplateManager
          tackleModal={() => tackleModal("LoadTemplate")}
          modalShow={loadTemplateShow}
          confirmSave={loadHtmlHandler}
          config={templateList}
          error={setmessageContent}
          message={messageContent}
          clearmessage={() =>
            setmessageContent({
              message: "",
              success: false,
              error: false,
              local: false,
            })
          }
        />
        {!messageContent.local && messageContent.message.length ? (
          <ResultHandler
            tackleModal={() => setmessagegeHandlerShow(!messageHandlerShow)}
            modalShow={messageHandlerShow}
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
      </main>
    </>
  )
}
