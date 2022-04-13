import fs from "fs";
import axios from "axios";

exports.handler = async (event: Input) => {
  
  let output;
  
  // make a GET request to Wikipedia using Axios
  try {
    const response = await axios.get(
      "https://en.wikipedia.org/w/api.php?action=query&titles=" + event.topic + "&prop=extracts&format=json&exintro=1",
    );

    // stringify the response data
    output = JSON.stringify(response.data, null, 4);
    console.log(output);

  // catch on error
  } catch (e) {
    console.log(e);
    output = JSON.stringify(e);

  // return 200 OK response
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: output
  };
};


interface Input {
  topic?: string;
}