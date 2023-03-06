/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Head from "next/head";

import { MdArrowDropDownCircle } from "react-icons/md";

import Canvas from "../components/Canvas/Canvas";
import Menu from "../components/Menu/Menu";
import TitleContentManager from "../components/TitleManagement/TitleContentManager/TitleContentManager";
import HigherManagementButton from "../components/UI/HigherManagementButton/HigherManagementButton";
import DefaultPaddingManager from "../components/DefaultPaddingManagement/DefaultPaddingManager/DefaultPaddingManager";
import NewCanvasManager from "../components/NewCanvasManagement/NewCanvasManager/NewCanvasManager";

import boilerplate from "../content-components/boilerplate";
import downloadFile from "../util/downloadFile";

import classes from "../styles/global.module.scss";
import TabbedContent from "../components/UI/TabbedContent/TabbedContent";
import SaveTemplateManager from "../components/SaveTemplateManagement/SaveTemplateManager/SaveTemplateManager";
import LoadTemplateManager from "../components/LoadTemplateManagement/LoadTemplateManager/LoadTemplateManager";
import { tabs } from "../util/tabConfig";

export default function Home() {
  const [htmlContentString, setHtmlContentString] = useState(``);
  const [currentPageConfig, setCurrentPageConfig] = useState();
  const [resetCanvas, setResetCanvas] = useState(false);
  const [loadedTemplate, setLoadedTemplate] = useState(null);
  const [templateList, setTemplateList] = useState({
    templates: [],
    loading: false,
  });
  const [emailTitle, setEmailTitle] = useState("");
  const [guideExpand, setGuideExpand] = useState(false);
  const [defaultComponentPadding, setDefaultComponentPadding] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  const [titleModalShow, setTitleModalShow] = useState(false);
  const [defaultPaddingModalShow, setDefaultPaddingModalShow] = useState(false);
  const [newCanvasShow, setNewCanvasShow] = useState(false);
  const [saveTemplateShow, setSaveTemplateShow] = useState(false);
  const [loadTemplateShow, setLoadTemplateShow] = useState(false);

  const tabConfig = tabs;

  const tackleModal = (type) => {
    if (type == "Title") {
      setTimeout(() => {
        setTitleModalShow(!titleModalShow);
      }, 250);
    }
    if (type == "DefaultPadding") {
      setTimeout(() => {
        setDefaultPaddingModalShow(!defaultPaddingModalShow);
      }, 250);
    }
    if (type == "NewCanvas") {
      setTimeout(() => {
        setNewCanvasShow(!newCanvasShow);
      }, 250);
    }
    if (type == "SaveTemplate") {
      setTimeout(() => {
        setSaveTemplateShow(!saveTemplateShow);
      }, 250);
    }
    if (type == "LoadTemplate") {
      setTimeout(() => {
        setLoadTemplateShow(!loadTemplateShow);
      }, 250);
    }
  };

  const exportHtmlHandler = async () => {
    if (!htmlContentString.length) {
      return alert("No content to export.");
    }
    const submitContent = boilerplate(
      htmlContentString ? htmlContentString : "No data",
      emailTitle ? emailTitle : "HTML title"
    );
    fetch("http://localhost:3000/api/html", {
      method: "POST",
      body: JSON.stringify(submitContent),
    }).then(async (response) => {
      if (response) {
        fetch("http://localhost:3000/api/getHtml", {
          method: "GET",
        }).then(async (data) => {
          downloadFile(data);
        });
      }
    });
  };

  const saveHtmlHandler = async (filename) => {
    if (!currentPageConfig.content.length) {
      return alert("No content to save.");
    }

    fetch("http://localhost:3000/api/saveHtml", {
      method: "POST",
      body: JSON.stringify({
        content: currentPageConfig,
        filename: filename,
      }),
    }).then(async (response) => {
      if (response.status == 200) {
        setSaveTemplateShow(!saveTemplateShow);
        return alert("Template has been successfully saved.");
      }
    });
  };

  const loadListHtmlHandler = async () => {
    setTemplateList({ ...templateList.templates, loading: true });
    fetch("http://localhost:3000/api/listTemplates", {
      method: "GET",
    }).then(async (response) => {
      const refiendResponse = await response.json();
      setTemplateList({ templates: refiendResponse.templates, loading: false });
    });
  };

  const loadHtmlHandler = async (filename) => {
    fetch("http://localhost:3000/api/getTemplate", {
      method: "POST",
      body: JSON.stringify({ filename: filename }),
    }).then(async (template) => {
      const loadedPageConfig = await template.json();
      setLoadedTemplate({ ...loadedPageConfig });
      setLoadTemplateShow(!loadTemplateShow);
      alert("Template has been loaded.");
    });
  };

  const confirmTitle = (title) => {
    setEmailTitle(title);
  };

  const guideExpandHandler = () => {
    setGuideExpand(!guideExpand);
  };

  const confirmNewCanvas = (reset) => {
    setResetCanvas(reset);
  };

  const saveTemplateModalHandler = () => {
    setSaveTemplateShow(!saveTemplateShow);
  };

  const loadTemplateModalHandler = () => {
    setLoadTemplateShow(!loadTemplateShow);
  };

  const confirmDefaultPadding = (setPaddings) => {
    setDefaultComponentPadding({
      paddingLeft: setPaddings.paddingLeft,
      paddingRight: setPaddings.paddingRight,
      paddingTop: setPaddings.paddingTop,
      paddingBottom: setPaddings.paddingBottom,
    });
  };

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
            onClick={guideExpandHandler}
            style={{
              transform: guideExpand ? "rotate(180deg)" : "rotate(0deg)",
              transition: ".2s",
            }}
          />
          <h1>Guide</h1>
          <TabbedContent contents={tabConfig} />
        </div>
        <div className={classes.Export}>
          <HigherManagementButton submitHandler={exportHtmlHandler}>
            Export HTML
          </HigherManagementButton>
        </div>
        <div className={classes.Save}>
          <HigherManagementButton submitHandler={saveTemplateModalHandler}>
            Save template
          </HigherManagementButton>
        </div>
        <div className={classes.Load}>
          <HigherManagementButton
            submitHandler={() => {
              loadTemplateModalHandler(), loadListHtmlHandler();
            }}
          >
            Load template
          </HigherManagementButton>
        </div>

        <Canvas
          setHTML={setHtmlContentString}
          setStringifiedHTML={setCurrentPageConfig}
          defaultComponentPaddings={defaultComponentPadding}
          newCanvas={resetCanvas}
          resetCanvasSetting={confirmNewCanvas}
          guideExpand={guideExpand}
          loadedTemplate={loadedTemplate}
          resetLoadedTemplate={setLoadedTemplate}
        />
        <TitleContentManager
          tackleModal={() => tackleModal("Title")}
          modalShow={titleModalShow}
          confirmTitle={confirmTitle}
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
          confirmHandler={confirmNewCanvas}
        />
        <SaveTemplateManager
          tackleModal={() => tackleModal("SaveTemplate")}
          modalShow={saveTemplateShow}
          confirmSave={saveHtmlHandler}
        />

        <LoadTemplateManager
          tackleModal={() => tackleModal("LoadTemplate")}
          modalShow={loadTemplateShow}
          confirmSave={loadHtmlHandler}
          config={templateList}
        />
      </main>
    </>
  );
}
