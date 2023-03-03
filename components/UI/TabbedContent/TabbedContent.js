import { useEffect, useRef, useState } from "react";
import classes from "./TabbedContent.module.scss";

const TabbedContent = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabHandler = (e, tab) => {
    setCurrentTab(tab);
  };
  return (
    <div className={classes.TabbedContent}>
      <div className={classes.TabWrapper}>
        {props.contents.map((content, index) => {
          return (
            <div
              className={[
                classes.Tab,
                currentTab == index ? classes["active"] : "",
              ].join(" ")}
              key={"tab-" + index}
              onClick={(e) => tabHandler(e, index)}
            >
              {content.title}
            </div>
          );
        })}
      </div>
      <div className={classes.ContentText}>
        {props.contents[currentTab].text}
      </div>
    </div>
  );
};

export default TabbedContent;
