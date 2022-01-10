import fs from "fs";
import { gzipSync } from "zlib";
import { OpenAPI } from "@stedi/sdk-converter-node";
import axios, { AxiosRequestConfig } from "axios";

const exampleFn = async () => {
  const input = fs.readFileSync("tst/sample.csv", "utf8");
  // gzip payload before sending it
  const payloadGzipped = gzipSync(JSON.stringify({ input_csv: input }));
  const config: AxiosRequestConfig = {
    method: "post",
    url: OpenAPI.BASE + "/convert_csv_to_json",
    headers: {
      "Content-Type": "application/gzip",
      "Accept-Encoding": "gzip",
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    data: payloadGzipped,
  };

  await axios(config)
    .then(function (response) {
      const output = JSON.stringify(response.data, null, 2);
      console.log(output);
    })
    .catch(function (e) {
      console.log(e);
    });
};

exampleFn();
