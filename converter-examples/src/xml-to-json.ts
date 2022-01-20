import { OpenAPI, Service as Converter } from "@stedi/sdk-converter-node";
import fs from "fs";

OpenAPI.HEADERS = { Authorization: `Key ${process.env.STEDI_API_KEY}` };

const exampleFn = async () => {
  try {
    const input = fs.readFileSync("tst/sample.xml", "utf8");
    const response = await Converter.convertXmlToJson({
      input_xml: input,
      options: {
        attribute_name_prefix: "abc",
        ignore_attributes: false,
        convert_attribute_types: true,
      },
    });
    const output = JSON.stringify(response.output_json, null, 2);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
