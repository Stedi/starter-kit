const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const axios = require("axios");

// Get environment variables
const apiKey = process.env.stedi_api_key;
const mapId = process.env.stedi_mapping_id;

// Create axios client to Stedi services
const axiosClient = axios.create({
  headers: {
    Authorization: `Key ${apiKey}`,
    "Content-Type": "application/json",
  },
});

async function getFileFromS3(Bucket, event) {
  try {
    const Key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    return await s3.getObject({ Bucket, Key }).promise();
  } catch (e) {
    console.log(e);
  }
}

async function translateEDI(edi_data) {
  try {
    const response = await axiosClient.request({
      method: "POST",
      url: "https://edi-core.stedi.com/2021-06-05/translate",
      data: {
        input_format: "edi",
        input: edi_data,
        output_format: "jedi@2.0-beta",
      },
    });
    const jedi = response.data;
    console.log("/translate RESP", JSON.stringify(jedi, null, 2));

    return {
      statusCode: 200,
      jedi,
    };
  } catch (e) {
    console.log(e);
  }
}

async function mapJEDI(jedi_data) {
  try {
    const response = await axiosClient.request({
      method: "POST",
      url: "https://mappings.stedi.com/2021-06-01/mappings/" + mapId + "/map",
      data: jedi_data,
    });

    const purchase_order = response.data;
    console.log("/map RESP", JSON.stringify(purchase_order, null, 2));

    return {
      statusCode: 200,
      purchase_order,
    };
  } catch (e) {
    console.log(e);
  }
}

async function putFileIntoS3(Bucket, purchase_order) {
  try {
    const objectName = `orders/${await purchase_order.po_number}-${Math.floor(Math.random() * 100)}.json`;

    const stringifiedData = JSON.stringify(purchase_order, null, 2); // Need this because putObject only accepts string type
    const s3PutObjectParams = {
      Bucket,
      Key: objectName,
      Body: stringifiedData,
      ContentType: `application/json`,
    };
    const result = await s3.putObject({ ...s3PutObjectParams }).promise();
    console.log(`File uploaded successfully at https:/` + Bucket + `.s3.amazonaws.com/` + objectName);
  } catch (e) {
    console.log(e);
  }
}

module.exports.handler = async (event, context) => {
  console.log("Event: ", JSON.stringify(event));

  try {
    // 1. Get file from S3 bucket
    const Bucket = event.Records[0].s3.bucket.name;
    const data = await getFileFromS3(Bucket, event);

    // 2. Call /translate to transform 850 EDI -> JEDI 850
    const translateResponse = await translateEDI(data.Body.toString("ascii"));

    // 3. Call /map to transform JEDI 850 -> Purchase Order JSON
    const mappingResponse = await mapJEDI(translateResponse.jedi);

    // 4. Put the Purchase Order JSON into S3 under the folder orders/
    const writeResult = await putFileIntoS3(Bucket, mappingResponse.purchase_order);

    // 5. End lambda
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Stedi Lambda succeeded!",
        result: writeResult,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e,
      }),
    };
  }
};
