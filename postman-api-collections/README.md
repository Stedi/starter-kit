# Stedi Postman collection

Welcome to Stedi Postman Collection guide - a quick and easy way to send API requests without code. In this repository, you will find examples and templates showing how to use [Stedi APIs](https://www.stedi.com/docs) using Postman.

We include API requests for the following Stedi services:

- Converter
- EDI Core
- Mappings

We will be adding requests for other Stedi services as they get released. 

## Getting started

To begin, [create a free Stedi account](https://terminal.stedi.com/sign-up) and create a [Stedi API Key](https://www.stedi.com/docs/authentication). 

Next, import the Postman collection to your workspace using the button below.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0bca9666a7bb162b59b2?action=collection%2Fimport)

### API key configuration
Once the collection has been imported into Postman, we need to configure a Stedi API key for authentication. 

Configure the Postman environment variable `stediApiKey` with your API key. You can configure this setting under the 'Environment Variables' tab on the left hand side of Postman. 

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/environment-variable.png">

Once the key is set, you can send API requests to Stedi. Make sure that the correct Postman environment variable is set in the top right corner of the screen ('Stedi API' in this case).

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/send-request.png">

For more details, please review our API documentation [on Documenter](https://documenter.getpostman.com/view/17436649/UVJbGHLL).

# Stedi services
## Converters

Converter is a collection of serverless APIs that provide a simple and convenient way of converting files into different formats.

We include prepopulated examples of how you can use the service to convert XML, JSON or CSV files in the Postman collection. 

You can find the API documentation for the Converter service [here](https://www.stedi.com/docs/api/converter). 


## EDI Core

EDI Core translates X12 EDI documents to JSON and vice versa. Stedi has its own JSON representation of EDI, called JEDI. JEDI is easier to work with than X12 EDI because most modern programming languages and tools have built-in support for JSON.

Our Postman examples contain prepopulated EDI and JEDI documents that you can use for testing. 

You can find the API documentation for the EDI Core service [here](https://www.stedi.com/docs/api/edi-core). 


## Mappings

Mappings lets you map JSON documents from one schema to another, using [JSONata](https://docs.jsonata.org/overview.html) for its mapping expressions.

In order to map JSON documents using the API, you need to create a mapping first. Click the button below to create a new example mapping in your Stedi account. 

<a href="https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/mapping.json&amp;source_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/jedi-850.json&amp;target_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/quickbooks-online-estimate.json" style="display:flex;justify-content:center" target="\_blank"><picture><img alt="" src="https://stedi.com/images/blog/complex-data-transformations-made-simple-with-mappings/run_on_stedi.svg" style="width:200px"></picture></a>

Once the mapping is created, replace the mapping ID in the API URL with your mapping ID. You can retrieve this ID from the Stedi terminal from the [mappings overview page](https://terminal.stedi.com/mappings). 

Finally, you can find the API documentation for the Mappings service [here](https://www.stedi.com/docs/api/mappings). 


### Formatting EDI files for EDI to JEDI requests 

If you want to use your own EDI files with EDI Core, you need to follow an additional step. 

Raw EDI files contain multiple whitespaces at the end of each line. We need to remove these newline characters (`\n`) before sending them in an API request to Stedi.

There are two ways to achieve this:

1. You can use a Bash command to remove the newline characters directly from a file. 
2. You can use a text editor like VS Code to remove the characters.


#### Removing newlines from EDI files using a Bash command

The following one line command will remove all newline characters from the 'edifile.txt' file and store the results in a new file called 'edifile-no-newline.txt':


```bash
tr -d '\n' < edifile.txt > edifile-no-newline.txt
```

#### Removing newlines from EDI files using a text editor

In your favourite text editor, replace the `\n` characters with a space. If you are using VS Code, you can do this with the following replacement command, which you can access through `Edit > Replace`:

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/replace-newline-before.png">

Enter `\n` in the first field of the replace command and a space in the second field.

After the replacement is completed, the file should look as follows:

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/replace-newline-after.png">
