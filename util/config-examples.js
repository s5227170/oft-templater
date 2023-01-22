const pageConfigExample = {
  content: [{}, {}, {}],
  title: "",
  parameters: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
};

const rowConfig = {
  type: "row",
  columns: 1,
  position: 0,
  parameters: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  contentComponents: [],
};

const textComponentConfig = {
  type: "Text",
  background: "none",
  color: "#fff",
  fontFamily: "arial",
  fontSize: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  content: ["", "", ""],
  position: 1,
};

const listComponentConfig = {
  type: "List",
  background: "none",
  color: "#000",
  fontFamily: "arial",
  fontSize: 14,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  content: ["", "", ""],
  position: 1,
};

const imageComponentConfig = {
  type: "Image",
  url: "",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  position: 1,
};