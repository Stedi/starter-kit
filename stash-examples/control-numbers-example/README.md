# Stedi Control Numbers Example Project

This project provides a small example on how to use the Stedi [Stash](https://www.stedi.com/docs/stash) Service for [Control Number](https://www.stedi.com/blog/control-numbers-in-x12-edi) generation.
Example code is in `/src`.

## Install

Change directory so your root is `starter-kit/stash-examples/control-numbers-example` then run:

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

```shell
npm run control-number-example
```

## Stedi Stash User Guide

The User Guide and API Reference are available on our Stedi [Stash Docs](https://www.stedi.com/docs/stash) page.
