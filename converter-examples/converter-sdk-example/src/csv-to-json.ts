import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const input = fs.readFileSync("tst/sample.csv", "utf8");

  try {
    const response = await axios.post(
      "https://converter.stedi.com/2021-10-01/csv_to_json",
      {
        input,
        options: {
          trim: true,
          has_header: true,
          delimiter: ",",
          convert_types: true,
          quote: '"',
          on_duplicate_headers: "fail",
        },
      },
      config
    );
    const output = JSON.stringify(response.data, null, 2);
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
