import fs from "fs"
const archiver = require("archiver")

export default async function handler(req, res) {
  const parsedData = JSON.parse(req.body)
  const subject = parsedData.subject

  //Create an .eml file
  const htmlContent = parsedData.content

  const headers = [
    "From: ",
    "To: ",
    "Subject: HTML Email",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "X-Unsent: 1",
    `X-Microsoft-CDO-MessageType: 0x1000`,
  ]
  const message = headers.join("\r\n") + "\r\n" + htmlContent
  fs.writeFileSync(`./html/content/${subject}.eml`, message, { mode: 0o666 })

  //Create the html file
  fs.writeFileSync(
    `./html/content/${subject}.html`,
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
  zip.file("./html/content/Content.html", { name: "Content.html" })
  zip.file("./html/content/Content.eml", { name: "Content.eml" })

  // Write the zip archive to a file
  const output = fs.createWriteStream(`./html/content/${subject}.zip`)
  zip.pipe(output)

  await zip.finalize()

  res.status(200).json({ status: "success" })
}
