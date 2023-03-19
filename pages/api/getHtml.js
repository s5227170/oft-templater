import fs from "fs"
import path from "path"

const filePath = path.join(__dirname, "../../../../html/content/Content.zip")

if (!filePath) {
  fs.mkdir("./html/saves", { recursive: true }, (err) => {
    if (err) throw err
  })
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/zip")
  res.setHeader("Content-Disposition", "attachment; filename=Content.zip")
  await fs.createReadStream(filePath).pipe(res)
}
