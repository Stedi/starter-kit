# Hello World function

Welcome to the `hello world` tutorial of Stedi Functions. In this guide, we will deploy a simple Function so you can learn how the concepts work. We will also write a Function from scratch to learn the concepts better. This tutorial should take you roughly 20 minutes to complete. 

## Getting Started with the sample code

In order to get started, you need need a Stedi account and be logged in to our Terminal; https://terminal.stedi.com/

Next, go to the Functions section of Terminal. Click "Create Function" on the top right of the screen. The create Function may take a few seconds to complete.

<screenshot-create-function>

Once the Function is created, you will see a screen that already contains a very simple example Function written in plain JavaScript. This Function does nothing special, it only prints the Log Group that will be used to store log results. Don't worry if you struggle to follow exactly what happens in the code, we will go in more detail later. 

```js
exports.handler = async function (event, context) {
  console.log("EVENT: " + JSON.stringify(event, null, 2));
  return {
    logStreamName: context.logStreamName
  };
};
```

<screenshot-sample-code>

To get a feeling for how functions behave, we  encourage to simply test this sample Function by pressing "Execute" on the top right of the screen. The Function will invoke and after a few seconds, you should see the output results of the execution and what was submitted to the Function logs. Within these logs, you can also see how long the execution took to complete. 

<screenshot-execute-hello-world>

# Writing our own function

Now let's try something more interesting and write our own Function! Before we do that, it's helpful to explain how an input event is handled by Functions and how you should program this. 

You may have noticed in the first example that the first line of code starts with: 

```exports.handler = async function (event, context)```

This is referred to as the Function handler method, and will be the entry point where our code starts. There are two inputs for the handler function:

- `event` contains the input event for the execution (i.e. from the Stedi API call or from Stedi Terminal). You can control the information that goes into the event object. 
- `context` contains information about the invocation, Function, and execution environment. This information is automatically provided by Stedi.

We always need to submit both objects to our handler as inputs, but we can also leverage this information in the code itself.  

There is another requirement for our Function to work - it always needs to return an output using a `return` (even an empty `{}` output is fine, as long as it returns something). This is the signal for the Function to know running of your code is complete and that it can stop the Function. You could see the same in the very first code example we ran at the bottom:

`return {
    logStreamName: context.logStreamName
  };`

Go ahead and create a new Stedi Function in Terminal, which you can call "hello world 2". In this function, we take the input from the event handler, modify it and return it back to the client.

For this function, we will take the input event for the API request to the service and modify it. 

```js
asd
```