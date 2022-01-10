# Stedi Converter Example Project

This project provides a small example on how to use the Stedi Converter SDK. The SDK is available in
[NPM](https://www.npmjs.com/package/@stedi/sdk-converter-node), and there's an example on how to use it in `/src`
. `/tst` provides a test file to convert.

- Disclaimer: the API and SDK are still classed as Developer Preview, and under active development - therefore subject
  to change.

## Install

Change directory so your root is `converter-examples` then run:

```shell
npm ci
```

## Set API key environment variable

Obtain a Stedi API key either from your Stedi contact or from [Stedi Terminal](https://terminal.stedi.com/) (go to API
Keys)

```shell
export STEDI_API_KEY="..."
```

## Run examples

Convert [CSV to JSON](https://www.stedi.com/docs/api/converter#convert-csvToJson)

```
npm run csv-to-json
```

Convert [JSON to CSV](https://www.stedi.com/docs/api/converter#convert-jsonToCsv)

```
npm run json-to-csv
```

Convert [XML to JSON](https://www.stedi.com/docs/api/converter#convert-xmlToJson)

```
npm run xml-to-json
```

Example sending compressed [request payload](https://www.stedi.com/docs/converter#compression)

```
npm run compressed-payload
```

## Stedi Converter User Guide

The User Guide and API Reference are available on our [Stedi Docs](https://www.stedi.com/docs/converter) page.
