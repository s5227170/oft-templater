import fs from "fs";

export default async function handler(req, res) {
    const parsedBody = JSON.parse(req.body)
    const parsedData = JSON.stringify(parsedBody.content);
    const filename = parsedBody.filename;
    fs.writeFileSync(`./html/${filename}.txt`, parsedData, (err, data) => {
        if (err) {
            res.status(500).json({ status: "failure", data: err })
        }
    });
    res.status(200).json({ status: "success" });
}
