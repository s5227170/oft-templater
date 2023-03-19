/* eslint-disable react/no-unescaped-entities */
export const tabs = [
  {
    title: "To begin",
    text: `To start using this tool, simply create a row from the button with a
    plus inside of it. This will generate a component that will allow
    for the creation of a certain type of a row, depending on the user's
    requirements. Once the user picks a row type, the row will be
    generated and slots for the different components will be created.
    These slots allow the users to add and customise content. Once the
    user has added and finished their component, they click on the tick
    icon in the upper right, which will confirm the changes and close
    the modal.`,
  },
  {
    title: "Rows",
    text: `Rows provide a button for limited customisations at the moment due
    to the early stage of the application. Some aspects like editing
    content after submission is currently not available. In order to
    change a row, the user must replace an already existing row with a
    new one, and adjust its position through the row settings window,
    which can be accessed via the row buttons on the right. A row has 
    its columns auto-adjusted to equal widths upon creation. The minimum 
    width for a row column is 100px, and there are no maximum restrictions, 
    however overall width will be restricted to 600px since that is the 
    standard size of an OFT email.`,
  },
  {
    title: "Components",
    text: (
      <>
        <h3><strong>Components</strong></h3>
        <p>
          There are three main types of components - Text, List, and Image. The
          Text and List components are almost identical, although, Text
          components will be compiled into paragraphs, while List components
          will be compiled into a list li components. Components can have their
          paddings set from the paddings section. There is a section that points
          to the remaining space that is required to fill the full length of the
          row. It will point to a value that shows either a positive, or a
          negative number, plus a colour, indicating the width status. A row
          background colour can be set through any component that is on that row
          through the row background section. All components can have their
          modal window resized width-wise for comfort.
        </p>
        <br></br>
        <h3><strong>Text</strong></h3>
        <p>
          Text components is straightforward. It has a text editor field which
          does require the user to click on an option, set the colour they want,
          confirm their choice, then, select the text they wish to add a hyper
          link to, or colour, and confirm their choice again. What is hapening
          is that the first time, the user sets the setting, and the second time
          that they open a setting window, they confirm the actual changes. This
          may be troublesome, however, it will be fixed in a future update.
        </p>
        <br></br>
        <h3><strong>List</strong></h3>
        <p>
          In a List component, all "new" lines will be created as a separate
          bullet point. This means that if an empty line is left empty, it will
          result in the creation of a bullet point with an empty line of text.
          Using the Enter key would create the next bullet point. Bullet point
          may not be visible on the List text editor, however, all lines will be
          turned into li elements after compilation.
        </p>
        <br></br>
        <h3><strong>Image</strong></h3>
        <p>
          Image components utilise url's to load images. Fetched images can be
          seen on the screen on the bottom of the modal window. They can be
          resized according to the user's needs. By default, images have their
          height disabled so they automatically have their height set so that
          the width/height ratio is kept. There is an option that allows for
          adding the height feature, although it may be needed in very rare
          cases. By standard, images should be exported with their correct size
          by the design team. Images can also have hyperlinks attached to them
          for the cases where a button image is utilised and it needs to lead to
          an external page. Currently, there is no way of adding alt settings to
          images, however, this will be added in the future.
        </p>
      </>
    ),
  },
  { title: "Editing", text: `` },
  { title: "Notes", text: `` },
  { title: "About", text: `` },
];
