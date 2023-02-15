import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../../../html/Content.html");

export default async function handler(req, res) {
  console.log(filePath);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Disposition", "attachment; filename=Content.html");
  await fs.createReadStream(filePath).pipe(res);

}
