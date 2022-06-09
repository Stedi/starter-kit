import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const sample = fs.readFileSync("tst/sample.json", "utf8");
  const input = JSON.parse(sample);

  // Check out https://www.stedi.com/docs/mappings to learn how to create a mapping.
  // You can also visit https://github.com/Stedi/starter-kit/tree/main/mappings-examples/starter-kit-mapping to create a mapping with a single click.
  const MAPPING_ID = "MAPPING_EDI_GOES_HERE";

  try {
    const response = await axios.post(
      `https://mappings.stedi.com/2021-06-01/mappings/${MAPPING_ID}/map`,
      input,
      config,
    );
    const output = JSON.stringify(response.data, null, 2);
    const outputFilePath = "/tmp/output.json";
    fs.writeFileSync(outputFilePath, output, "utf8");
    console.log(`The converted output file is available at: ${outputFilePath}`);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
