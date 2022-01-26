import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const input = JSON.parse(fs.readFileSync("tst/sample.json", "utf8"));

  try {
    const response = await axios.post(
      "https://converter.stedi.com/2021-10-01/json_to_csv",
      {
        input,
        options: {
          delimiter: ",",
        },
      },
      config
    );
    const output = response.data.output;
    console.log(output);
  } catch (e) {
    console.log(e);
  }
};

exampleFn();
