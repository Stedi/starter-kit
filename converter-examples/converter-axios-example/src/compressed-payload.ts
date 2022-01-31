import fs from "fs";
import { gzipSync } from "zlib";
import axios, { AxiosRequestConfig } from "axios";

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/gzip",
      "Accept-Encoding": "gzip",
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const input = fs.readFileSync("tst/sample.csv", "utf8");
  // gzip payload before sending it
  const payloadGzipped = gzipSync(JSON.stringify({ input }));

  try {
    const response = await axios.post(
      "https://converter.stedi.com/2021-10-01/csv_to_json",
      payloadGzipped,
      config
    );
    const output = JSON.stringify(response.data, null, 2);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();