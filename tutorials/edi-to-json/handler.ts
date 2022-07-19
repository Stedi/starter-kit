import { BucketsClient, GetObjectCommand, PutObjectCommand } from "@stedi/sdk-client-buckets";
import axios from "axios";
import consumers from 'stream/consumers';

// Create a new buckets client
const bucketClient = new BucketsClient({region: "us"});

var enc = new TextEncoder(); 

// EDI Core translate request
async function ediCoreRequest(ediRequestBody: string) {

  const requestJson = {
    input: ediRequestBody,
    input_format: "edi",
    output_format: "jedi@2.0"
  }

  // Create a new Axios request
  const request = await axios.request({
    method: "POST",
    url: "https://edi-core.stedi.com/2021-06-05/translate",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Key " + process.env.STEDI_API_KEY
    },
    data: requestJson
  }).then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return error;
  });

  return request;

};

// PUT the bucket object
async function putBucketObject(bucketObjectKey: string, bucketName: string, bucketObjectBody: string): Promise<void> {

  const putBucketData = await bucketClient.send(new PutObjectCommand({
    bucketName: bucketName,
    key: `output/${bucketObjectKey.split('/').at(-1)}-${Date.now()}.json`,
    body: enc.encode(bucketObjectBody)
  }));

  console.log(`PUT bucket object ${bucketObjectKey}`);
  console.log(putBucketData.$metadata.httpStatusCode);
  return;
}

// GET the bucket object
async function getBucketObject(bucketName: string, bucketObjectKey: string) {

  let bodyOutput;
  let statusCode;
  let statusError;

  // Get the bucket object from bucket client
  try {

    const getBucketData = await bucketClient.send(new GetObjectCommand({
      bucketName: bucketName,
      key: bucketObjectKey
    }));

    // Read the bucket object body
    const bucketObjectBody = await consumers.text(getBucketData.body);

    // Log the bucket object body
    console.log(`GET bucket object ${bucketObjectKey}`);
    bodyOutput = bucketObjectBody.toString();
    statusCode = getBucketData.$metadata.httpStatusCode;
    statusError = null;

  } catch (error) {

    console.log(`GET bucket object ${bucketObjectKey} error`);
    bodyOutput = "";
    statusError = "Get Object Error";
    statusCode = 500;

  }

  return [bodyOutput, statusCode, statusError];

}

// Main function handler
export async function handler(event, _context) {
    
  // Get the bucket object key from event input
  const bucketName = event.Records[0].s3.bucket.name || "default";
  const bucketObjectKey = event.Records[0].s3.object.key || "test.txt";

  // If the S3 object key does not start with "input/", return an error
  if (!bucketObjectKey.startsWith("input/")) {
    const msg = `Bucket object ${bucketObjectKey} does not start with input/, quitting`;
    
    console.log(msg);
    return msg;

  } else {
    console.log(`Bucket object ${bucketObjectKey} start with input/, proceeding`);

  }

  // GET bucket object
  const bodyOutput = await getBucketObject(bucketName, bucketObjectKey);

  console.log("bucketName: " + bucketName); 
  console.log("bucketObjectKey: " + bucketObjectKey);
  console.log("bodyOutput: " + bodyOutput);

  const jediResponse = await ediCoreRequest(bodyOutput.toString());
  console.log("jediResponse: " + JSON.stringify(jediResponse.output));

  await putBucketObject(bucketObjectKey, bucketName, JSON.stringify(jediResponse.output));

  // Return the function response
  return {
    headers: {
      "content-type": "application/json"
    },
    bucketObjectKey: bucketObjectKey,
    bucketObjectBody: bodyOutput[0],
    statusCode: bodyOutput[1],
    statusError: bodyOutput[2],
    jediResponse: jediResponse.output,
    jediError: jediResponse.output.statusError
  };
};
