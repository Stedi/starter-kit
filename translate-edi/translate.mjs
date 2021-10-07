import { readFile, readdir } from "fs/promises"
import { request } from "https"

const path = "./invoices";
const url = "https://edi-core.stedi.com/2021-06-05/translate";

const files = await readdir(path);
for (const file of files) {
  const body = JSON.stringify({
    input_format: "edi",
    output_format: "jedi@1.0",
    input: await readFile(`${path}/${file}`, "ascii")
  })
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length,
      "Authorization": `Key ${process.env.STEDI_API_KEY}`
    }
  }

  const req = request(url, options, response => {
    if (response.statusCode === 200) {
      response.on("data", data => {
        const responseBody = JSON.parse(data);
        console.log(JSON.stringify(responseBody.output));
      })
    }
    else {
      response.on("data", data => {
        console.log(response.statusCode + " " + data);
      })
    }
  })

  req.on("error", error => {
    console.error(error);
  })

  req.write(body);
  req.end();
}