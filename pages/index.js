/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import { Inter } from "@next/font/google";

import Canvas from "../components/Canvas/Canvas";
import Menu from "../components/Menu/Menu";

import classes from "../styles/global.module.scss";
// const Canvas = lazy(() => import("../components/Canvas/Canvas"));
import { lazy, Suspense, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import HigherManagementButton from "../components/UI/HigherManagementButton/HigherManagementButton";
import boilerplate from "../content-components/boilerplate";
import Modal from "../components/Modal/Modal";
import TitleContent from "../components/TitleContent/TitleContent";
import TitleContentManager from "../components/TitleContentManager/TitleContentManager";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [htmlContentString, setHtmlContentString] = useState(``);
  const [modalShow, setModalShow] = useState(false);
  const [emailTitle, setEmailTitle] = useState("")

  const tackleModal = () => {
    console.log("test");
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

  const exportHtmlHandler = () => {
    const submitContent = boilerplate(
      htmlContentString ? htmlContentString : "No data",
      "HTML title"
    );
    //use .replace(/(\r\n|\n|\r)/gm, ""); in case new line symbols arent removed on the BE
    fetch("http://localhost:3000/api/html", {
      method: "POST",
      body: JSON.stringify(submitContent),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const confirmTitle = (title) => {
    setEmailTitle(title)
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
        <Menu titleHandler={tackleModal} />
        <div className={classes.Guide}>
          <h1>Guide</h1>
          <br></br>
          <p>
            To start using this tool, simply create a row from the button with a
            plus inside of it. This will generate a component that will allow
            for the creation of a certain type of a row, depending on the user's
            requirements. Once the user picks a row type, the row will be
            generated and slots for the different components will be created.
            These slots allow the users to add and customise content. Once the
            user has added and finished their component, they click on the tick
            icon in the upper right, which will confirm the changes and close
            the modal.
          </p>
          <br></br>
          <p>
            Rows provide a button for limited customisations at the moment due
            to the early stage of the application. Some aspects like editing
            content after submission is currently not available. In order to
            change content, the user must replace an already existing row with a
            new one, and adjust its position through the row settings window,
            which can be accessed via the row buttons on the right.
          </p>
        </div>
        <div className={classes.Export}>
          <HigherManagementButton submitHandler={exportHtmlHandler}>
            Export HTML
          </HigherManagementButton>
        </div>
        <Canvas setHTML={setHtmlContentString} />
        <TitleContentManager
          tackleModal={tackleModal}
          modalShow={modalShow}
          confirmTitle={confirmTitle}
        />
      </main>
    </>
  );
}
