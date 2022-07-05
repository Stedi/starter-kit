import { ControlNumber } from "./client/control-number";

require("dotenv").config();

let apiKey = process.env.STEDI_API_KEY;
if (apiKey === null || apiKey === undefined) {
  throw new Error("");
}

let stashControlNumberKeyspaceName = "control-numbers";
let stashControlNumberKey = "controlNumber1";

let stashClient = new ControlNumber(apiKey, stashControlNumberKeyspaceName);
stashClient.prepareKeyspace().then((v: boolean) => {
  if (v) {
    stashClient
      .getNextControlNumber(stashControlNumberKey)
      .then((v: number) => {
        console.log(`The next control number is ${v}`);
      });
  } else {
    console.log(
      `Keyspace ${stashControlNumberKeyspaceName} is not ready yet. Try again.`
    );
  }
});
