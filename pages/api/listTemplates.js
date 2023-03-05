import fs from "fs";
const htmlFolder = './html';

export default async function handler(req, res) {
    const availableFiles = [];

    fs.readdirSync(htmlFolder).forEach(file => {
        if (file != "Content.html") {
            availableFiles.push(file)
        }
    });
    console.log(availableFiles)
    res.status(200).json({ templates: availableFiles })
}








