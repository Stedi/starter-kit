import fs from "fs";
import axios from "axios";

exports.handler = async (event: Input) => {
  
  let output;
  
  try {
    const response = await axios.get(
      "https://en.wikipedia.org/w/api.php?action=query&titles=Electronic_data_interchange&prop=extracts&format=json&exintro=1",
    );
    output = JSON.stringify(response.data, null, 4);
    console.log(output);

  } catch (e) {
    console.log(e);
    output = JSON.stringify(e);

  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: output
  };
};

interface Input {
  input_format?: string;
  output_format?: string;
  input?: string;
  output_options?: object;
  validation_options?: object;
}