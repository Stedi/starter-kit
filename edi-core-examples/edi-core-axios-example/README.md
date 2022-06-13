# Stedi EDI Core Example Project

This project provides a small example on how to use the Stedi EDI Core API. Example code is in `/src`, and `/tst` provides test files to translate between JSON and [JEDI](https://www.stedi.com/docs/edi-core/jedi-format).

## Install

Change directory so your root is `edi-core-axios-example` then run:

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

## Run examples

Translate [EDI to JEDI](https://www.stedi.com/docs/api/edi-core#translate)

```
npm run edi-to-jedi
```

(Learn more about JEDI here: https://www.stedi.com/docs/edi-core/jedi-format)

Convert [JEDI to EDI](https://www.stedi.com/docs/api/edi-core#translate)

```
npm run jedi-to-edi
```

## Stedi EDI Core User Guide

The User Guide and API Reference are available on our [Stedi Docs](https://www.stedi.com/docs/edi-core) page.
