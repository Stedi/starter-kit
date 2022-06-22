import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const input = fs.readFileSync("tst/sample.edi", "utf8");

  try {
    const response = await axios.post(
      "https://edi-core.stedi.com/2021-06-05/translate",
      {
        input,
        input_format: "edi",
        output_format: "jedi@2.0",
      },
      config,
    );
    const output = JSON.stringify(response.data, null, 2);
    const outputFilePath = "/tmp/jedi.json";
    fs.writeFileSync(outputFilePath, output, "utf8");
    console.log(`The converted output file is available at: ${outputFilePath}`);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
