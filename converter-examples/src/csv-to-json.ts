import { OpenAPI, Service as Converter } from "@stedi/sdk-converter-node";
import fs from "fs";

OpenAPI.HEADERS = { Authorization: `Key ${process.env.STEDI_API_KEY}` };

const exampleFn = async () => {
  try {
    const input = fs.readFileSync("tst/sample.csv", "utf8");
    const response = await Converter.convertCsvToJson({
      input_csv: input,
      options: {
        trim: true,
        has_header: true,
        delimiter: ",",
        convert_types: true,
      },
    });
    const output = JSON.stringify(response.output_json, null, 2);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
