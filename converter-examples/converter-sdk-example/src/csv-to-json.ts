import { OpenAPI, Service as Converter } from "@stedi/sdk-converter-node";
import fs from "fs";

OpenAPI.HEADERS = { Authorization: `Key ${process.env.STEDI_API_KEY}` };

const exampleFn = async () => {
  try {
    const input = fs.readFileSync("tst/sample.csv", "utf8");
    const response = await Converter.convertCsvToJson({
      input,
      options: {
        trim: true,
        has_header: true,
        delimiter: ",",
        convert_types: true,
        quote: '"',
        on_duplicate_headers: "fail",
      },
    });
    const output = JSON.stringify(response.output, null, 2);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
