# Stedi Mappings Example Project

This project provides a small example on how to use the Mappings Core API. Example code is in `/src`, and `/tst` provides test files to transform data using a given mapping.

## Install

Change directory so your root is `mapping-axios-example` then run:

```shell
npm ci
```

## Set API key environment variable

Obtain a Stedi API key either from your Stedi contact or from [Stedi Terminal](https://terminal.stedi.com/) (go to API
Keys)

```shell
export STEDI_API_KEY="..."
```

Alternatively you can rename `.env.example` file to `.env` and set the API key in it.

```shell
STEDI_API_KEY=API_KEY_GOES_HERE
```

## Run example

Transform data using a mapping.

(Note that you'd need to create a mapping in Stedi UI first. See [Getting started with Mappings](https://www.stedi.com/docs/tutorials/getting-started-with-mappings) for an introduction. We also provide [video tutorials](https://www.stedi.com/docs/mappings/video-tutorials) to help you get started.)

```
npm run mapping
```

## Stedi EDI Core User Guide

The User Guide and API Reference are available on our [Stedi Docs](https://www.stedi.com/docs/mappings) page.
