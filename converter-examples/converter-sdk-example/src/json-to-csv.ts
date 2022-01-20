import { OpenAPI, Service as Converter } from "@stedi/sdk-converter-node";
import fs from "fs";

OpenAPI.HEADERS = { Authorization: `Key ${process.env.STEDI_API_KEY}` };

const exampleFn = async () => {
  try {
    const input = JSON.parse(fs.readFileSync("tst/sample.json", "utf8"));
    const response = await Converter.convertJsonToCsv({
      input_json: input,
      options: {
        delimiter: ",",
      },
    });
    const output = response.output_csv;
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
