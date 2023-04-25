import fs from "fs"
import path from "path"

export default async function handler(req, res) {
  const subject = req.query.filename;

  const filePath = path.join(__dirname, `../../../../../html/content/${subject}.zip`)

  if (!filePath) {
    fs.mkdir("./html/content", { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  res.setHeader("Content-Type", "application/zip")
  res.setHeader(`Content-Disposition`, `attachment; filename=${subject}.zip`)
  await fs.createReadStream(filePath).pipe(res)
}
