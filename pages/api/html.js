import fs from "fs"
import archiver from "archiver"
import path from "path"

export default async function handler(req, res) {
  const parsedData = JSON.parse(req.body)

  //Create an .eml file
  const htmlContent = parsedData.content

  const headers = [
    "From: ",
    "To: ",
    `Subject: ${parsedData.subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "X-Unsent: 1",
    `X-Microsoft-CDO-MessageType: 0x1000`,
  ]

  //Reset content folder to clean previous build in order to build the new one(cleaning)
  fs.readdir("./html/content", (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join("./html/content", file), (err) => {
        if (err) throw err;
      });
    }
  });

  fs.mkdir("./html/content", { recursive: true }, (err) => {
    if (err) throw err
  })

  const message = headers.join("\r\n") + "\r\n" + htmlContent
  fs.writeFileSync(`./html/content/${parsedData.subject}.eml`, message, { mode: 0o666 })

  //Create the html file
  fs.writeFileSync(
    `./html/content/${parsedData.subject}.html`,
    htmlContent,
    (err, data) => {
      if (err) {
        res.status(500).json({ status: "failure", data: err })
      }
    }
  )

  //Create a zip file
  const zip = archiver("zip")

  // Add multiple files to the zip archive
  zip.file(`./html/content/${parsedData.subject}.html`, { name: `${parsedData.subject}.html` })
  zip.file(`./html/content/${parsedData.subject}.eml`, { name: `${parsedData.subject}.eml` })

  // Write the zip archive to a file
  const output = fs.createWriteStream(`./html/content/${parsedData.subject}.zip`)
  zip.pipe(output)

  await zip.finalize()

  res.status(200).json({ status: "success" })
}
