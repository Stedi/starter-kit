import { BucketsClient, GetObjectCommand, PutObjectCommand } from "@stedi/sdk-client-buckets";
import { Readable } from "stream";
import axios from "axios";

// Create a new buckets client
const bucketClient = new BucketsClient({region: "us"});

// Function to convert a response stream to a buffer
function readBody(stream: Readable) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.once("end", () => resolve(Buffer.concat(chunks)));
    stream.once("error", reject);
  });
}

// Create encoder for string to uint8 array
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
    key: "output/" + bucketObjectKey.split('/').at(-1),
    body: enc.encode(bucketObjectBody)
  }));

  console.log(`PUT bucket object ${bucketObjectKey}`);
  console.log(putBucketData.$metadata.httpStatusCode);
  return;
}

// GET the bucket object
async function getBucketObject(bucketName: string, bucketObjectKey: string) {

  var bodyOutput;
  var statusCode;
  var statusError;

  // Get the bucket object from bucket client
  try {

    const getBucketData = await bucketClient.send(new GetObjectCommand({
      bucketName: bucketName,
      key: bucketObjectKey
    }));

    // Read the bucket object body
    const bucketObjectBody = await readBody(getBucketData.body);

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
    const msg = "Bucket name " + bucketObjectKey + " does not start with input/";
    console.log(msg);
    return msg;

  } else {
    console.log("Bucket name " + bucketName + " starts with input, proceeding");

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
