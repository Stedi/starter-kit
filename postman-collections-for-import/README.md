# Stedi Postman collection

Welcome to Stedi Postman Collection guide - a quick and easy way to send API requests without code. In this repo you'll find examples and templates showing how to use [Stedi APIs](https://www.stedi.com/docs) using Postman.

## First things first  

1. [Create a free Stedi account](https://terminal.stedi.com/sign-up) to get an [API Key](https://www.stedi.com/docs/authentication) you'll use in Postman
2. Import the 'Stedi.postman_collection.json' file to your Postman workspace.

## Configuration
Once the collection has been imported into Postman, go through the steps below to configure API Keys and start making your first API requests. 

1. Go to the `Headers` section of an API call 
2. In the `Authorization` row, replace the dummy variable `111222333444555666777888999000abc` with your API Key. 
3. Save your changes to start making API requests!  
<img width="1034" alt="Screen Shot 2021-11-25 at 2 22 42 PM" src="https://user-images.githubusercontent.com/89091046/143492632-06616cd5-8f82-4375-ac06-b79330d9bbbb.png">
<img width="739" alt="Screen Shot 2021-11-25 at 2 23 10 PM" src="https://user-images.githubusercontent.com/89091046/143492629-9489fb61-1b61-4db4-a3b2-02f78d4825b5.png">


## How to format EDI file for Postman calls 
Raw EDI files contain whitespaces at the end of each line. You'll need to convert an EDI file for Postman requests, here's how to do it: 
1. Open up a blank file in a text editor that has Regex find-and-replace capability (Atom, Visual Studio Code, Notepad++, Sublime, TextEdit) ![texteditor](https://user-images.githubusercontent.com/89091046/143493570-6409cc36-d1bc-491f-a78f-bb00a1688f51.png) 
2. Paste your EDI file ![pasteEDI](https://user-images.githubusercontent.com/89091046/143493639-93938e28-9226-407c-8580-9776f0358c02.png)
3. Open up Find-and-Replace, and enable the Regex setting. ![regex](https://user-images.githubusercontent.com/89091046/143494233-8042a55b-12cf-40db-a99a-ae5c090831c7.png)
4. In the Find, type in: `\n` ![find](https://user-images.githubusercontent.com/89091046/143494347-7a838d0b-84e4-4bc4-b2ec-c87acf2a105e.png)

5. In the Replace, type in:`\\n` (This will allow the newline character to be replaced with a tangible **backlash** followed by the letter **n**.) ![replace](https://user-images.githubusercontent.com/89091046/143494359-9bb881d9-ccba-473b-95d2-56d93974ae11.png)
6. Hit `Apply All` ![apply](https://user-images.githubusercontent.com/89091046/143494437-d8b3769c-d7b7-4469-9918-4307dd77751a.png)
7. Now press cmd+A (to select all), and cmd+C to copy. This is the string input to your `/translate` call for EDI Core to convert an EDI -> JEDI.

## EDI Core API
<img src="https://user-images.githubusercontent.com/89091046/136258093-c3aba730-7109-4f64-acc0-46dda44043cb.png" width=50% height=50%>

