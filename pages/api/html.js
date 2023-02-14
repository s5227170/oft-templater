import fs from "fs";

export default async function handler(req, res) {
  const parsedData = JSON.parse(req.body);
  console.log(parsedData);
  //First parameter is location, second one is the content
  fs.writeFileSync("./html/Content.html", parsedData, (err, data) => {
    console.log(data);
  });
  res.status(200).json({ status: "success" });
}
