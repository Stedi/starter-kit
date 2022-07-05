import { ControlNumber } from "./client/control-number";

require("dotenv").config();

let apiKey = process.env.STEDI_API_KEY;
if (apiKey === null || apiKey === undefined) {
  throw new Error("");
}

let stashClient = new ControlNumber(apiKey, "keyspace23");
let result = stashClient.prepareKeyspace();
result
  .then((v) => {
    if (v) {
      return stashClient.getControlNumber("ctrln");
    }
  })
  .then((v) => {
    console.log(v);
  });
