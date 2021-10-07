import { readFile } from "fs/promises"
import { request } from "https"

const url = "https://edi-core.stedi.com/2021-06-05/translate";
const body = JSON.stringify({
  input_format: "edi",
  output_format: "jedi@1.0",
  input: await readFile("example.x12", "ascii")
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
  console.log(response.statusCode);

  response.on("data", data => {
    const responseBody = JSON.parse(data);
    console.log(JSON.stringify(responseBody.output));
  })
})

req.on("error", error => {
  console.error(error);
})

req.write(body);
req.end();