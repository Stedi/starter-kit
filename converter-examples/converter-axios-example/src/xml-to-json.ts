import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";

const exampleFn = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Key ${process.env.STEDI_API_KEY}`,
    },
  };

  const input = fs.readFileSync("tst/sample.xml", "utf8");

  try {
    const response = await axios.post(
      "https://converter.stedi.com/2021-10-01/xml_to_json",
      {
        input,
        options: {
          attribute_name_prefix: "abc",
          ignore_attributes: false,
          convert_attribute_types: true,
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
