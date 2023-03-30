import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../../../html/saves/");

export default async function handler(req, res) {
    const parsedData = JSON.parse(req.body);
    const filename = parsedData.filename
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    await fs.createReadStream(filePath + filename.toString()).pipe(res);
}
