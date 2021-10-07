import { readFile, readdir } from "fs/promises"
import { request } from "https"

const path = "./invoices";
const url = "https://edi-core.stedi.com/2021-06-05/translate";

let totalAmount = 0;
let openRequests = 0;   // TODO: Find a better way of handling async.

const files = await readdir(path);
for (const file of files) {
  openRequests += 1

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
    response.on("data", data => {
      const responseBody = JSON.parse(data);
      if (response.statusCode == 200) {
        if (responseBody.code == "valid") {
          // TODO: Figure out if this can lead to a race condition.
          totalAmount += parseInt(responseBody.output.interchanges[0].groups[0].transaction_sets[0].summary["0100_TDS"]["01"]);
        }
        else {
          console.warn(`Skipping ${file} because it failed validation.`);
        }
      }
      else {
        console.log(response.statusCode + " " + data);
      }

      // TODO: Find a better way of waiting for all requests to be done.
      if (--openRequests == 0) {
        console.log(totalAmount);
      }
    })
  })

  req.on("error", error => {
    console.error(error);
  })

  req.write(body);
  req.end();
}