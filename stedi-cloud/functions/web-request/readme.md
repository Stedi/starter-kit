# Web request Function (advanced)

Welcome to the `web request` tutorial of Stedi Functions. In this guide, we will deploy a Function packaged with your own libraries to make an external web request. The tutorial should take you 30 minutes to finish and can be completed within Stedi's free tier. 

We encourage to take a quick look at our "hello world" tutorial <link> before starting this one. We build on the same concepts that were explained there in this guide. One difference is that we will also use your local CLI here to run a few commands to build and package your function. The Function here is written in TypeScript, but you can also use JavaScript if you prefer. 

## Getting Started

We have two methods to author Stedi Functions:

- Inline code editing, where you can edit your code directly in the Stedi Terminal. This is the easiest way to edit Functions, but it does not support bundling libraries or larger sections of code. The limit for inline code editing is aproximatly 4 kB in total. 

- ZIP based code editting, where you bundle an archive with your code and upload it to Stedi through our API. You can bundle up to 5MB of code this way and include any libraries or SDK's that you need for your Function. You do need to bundle and upload this code using the CLI, editting the Function through Terminal is not possible this way. 

We will use the ZIP based method here using a Bash script included in this repository. In order to get started, you need need a Stedi account and be logged in to our Terminal; https://terminal.stedi.com/


In addition, ensure you have the following tools available:

- git (https://git-scm.com/downloads)
- npx (https://npx.dev)
- npm (https://www.npmjs.com/get-npm)
- curl (https://curl.haxx.se/docs/manpage.html)
- jq (https://stedolan.github.io/jq/)


Now go ahead and create a new Stedi Function in Terminal and name it 'webrequest'. After creation the Function will contain a standard, inline code example (the same one as in the "hello world" tutorial we looked at earlier). 

In order to make an outbound web request, we should include the Axios library in the ZIP file we will create. Axios is a popular HTTP client that makes it easy to make HTTP requests, but you could also use any other HTTP client that you like.

For the next steps, you will need to access your local (Bash) terminal. First off, clone our GitHub repository to your local machine.

```bash
git clone https://github.com/Stedi/starter-kit.git
cd starter-kit/stedi-cloud/functions/web-request
```

Once the command has completed, you should have the following files in your local folder:

```
.
├── deploy.sh       # Deploys the Functions ZIP to Stedi Cloud using Bash script
├── index.ts        # The Lambda handler code written in TypeScript
└── package.json    # A package file to download Axios and other Node packages when we deploy the ZIP
```

The 'deploy.sh' file is a helper script to deploy ZIP based Functions from your local (Bash) terminal a bit easier. We intend to have a full SDK and CLI tools for this in the future, we will update this guide once those are available. 

The deploy script has the following options available:

```
Usage:
    
        ./deploy.sh [OPTION]

    Options:

        build: build package
        delete: delete function
        create: create function
        update: update function
        read: describe function
        list: list all functions
        logs: view logs for function
        invoke: invoke function
```

Let's go ahead and open the 'deploy.sh' file in a text editor. There are two things to pay attention to in this file:

- On line 4, ensure that your valid Stedi API key is entered. You can create a new API key here; https://terminal.stedi.com/apikeys
- On line 5, make sure that the function name is "webrequest" (or whatever name you gave the Function just created).

Save the file and return to your Bash terminal. Now that your Stedi credentials are set up, you can test if they can succesfully see and describe your function. Try running '$ bash deploy.sh describe' - it should return something like this:

```bash
describe function webrequest

{
  "code": "exports.handler = async function (event, context) {\n  console.log(\"EVENT: \" + JSON.stringify(event));\n  return { event };\n};",
  "created_at": "2022-04-13T22:05:50.157Z",
  "environment_variables": {},
  "function_name": "webrequest",
  "log_group_name": "/aws/lambda/webrequest",
  "log_retention": "one_day",
  "updated_at": "2022-04-13T22:05:50.157Z"
}
```

You can see a few interesting properties in the API response. We can see that the Function is using the default code that's included upon creation. We can also see details about when the function was created and updated. 

Since we do want to make an outbound web request with the Function, we should take a look at the 'handler.ts' code. In the code, we make a simple HTTP GET request using Axios to Wikipedia in order to retrieve some HTML content. You can take a look at the Function's code to get a better understanding of this, we left some comments to make it easier to read and understand. You will also see that we create a Function handler and return the event as described in the previous guide. 

<screenshot-code>

The code is only locally present on our machine, so we need to deploy it to Stedi Cloud. We can do this by running the 'bash deploy.sh update' command. Since the Function is already created, we need to issue the 'update' instead of a 'create' command here. The response should look as follows:

```bash
starting build

  adding: index.js (deflated 78%)

built package for webrequest, ready to deploy


{
  "created_at": "2022-04-13T22:05:50.157Z",
  "environment_variables": {},
  "function_name": "webrequest",
  "log_group_name": "/aws/lambda/webrequest",
  "log_retention": "one_day",
  "updated_at": "2022-04-13T22:16:36.768Z"
}
completed PUT for webrequest function
```

The Function should now be succesfully updated and we should try to invoke it. Since we already have the helper script installed, we can do this by running '$ bash deploy.sh invoke'. The response should look as follows:

```bash
invoke function webrequest

{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "<some long text>"
}
```

We can also invoke the Function through Stedi Terminal, but in most cases it's easier to programatically invoke it using our API. 

This concludes our first tutorial on Functions. We hope you enjoyed the experience and will build great solutions with Stedi Cloud!

