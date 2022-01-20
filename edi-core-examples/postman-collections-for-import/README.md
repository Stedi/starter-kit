# Stedi Postman collection

Welcome to Stedi Postman Collection guide - a quick and easy way to send API requests without code. In this repository, you will find examples and templates showing how to use [Stedi APIs](https://www.stedi.com/docs) using Postman.

We currently include requests to EDI Core and will be adding requests for other Stedi services shortly. 

## First things first  

To begin, [create a free Stedi account](https://terminal.stedi.com/sign-up) and create a [Stedi API Key](https://www.stedi.com/docs/authentication). 

Next, import the Postman collection to your workspace using the button below.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0bca9666a7bb162b59b2?action=collection%2Fimport)

## API key configuration
Once the collection has been imported into Postman, we need to configure a Stedi API key. 

Configure the Postman environment variable `stediApiKey` with your API key. You can configure this setting under the 'Environment Variables' tab on the left hand side of Postman. 

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/environment-variable.png">

Once the key is set, you can send API requests to Stedi. Make sure that the correct Postman environment variable is set in the top right corner of the screen ('Stedi API' in this case).

<img src = "https://raw.githubusercontent.com/Stedi/starter-kit/main/images/edi-core/send-request.png">

For more details, please review our API documentation [on Documenter](https://documenter.getpostman.com/view/17436649/UVJbGHLL).

### Formatting EDI files for EDI to JEDI requests 

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
