# Hello World function


*Level: Beginner*

*Duration: 20 minutes*

*Language: TypeScript*

Welcome to the `hello world` tutorial of Stedi Functions. In this guide, we will deploy a simple Function so you can learn how the service works. 

In the second part, we will also write a basic Function from scratch to learn the concepts better. The full tutorial should take you roughly 20 minutes to complete and can be completed [within the free Stedi tier](https://www.stedi.com/products/pricing).


## Getting Started 

In order to get started, you need need a Stedi account and be logged in to [Stedi Terminal]( https://terminal.stedi.com/).

Next, go to the Functions section of Terminal. Click "Create Function" on the top right of the screen and give it a cool name (like "hello world"). The create Function command may take a few seconds to complete.

<screenshot-create-function>

Once the Function is created, you will see a screen that already contains a very simple example Function written in plain JavaScript. This Function does nothing too special, it only prints the Log Group that will be used to store log results. 

Don't worry if you struggle to follow exactly what happens in the code, we will go in more detail later. 

```js
exports.handler = async function (event, context) {
  console.log("EVENT: " + JSON.stringify(event, null, 2));
  return {
    logStreamName: context.logStreamName
  };
};
```

## Testing the sample Function

To get a feeling for how functions behave, we encourage to simply test this sample Function by pressing "Execute" on the top right of the screen. The Function will invoke and after a few seconds, you should see the output results of the execution and what was submitted to the Function logs. 

Within these logs, you can also see how long the execution took to complete and a few other details about the invoke: 

```console
START RequestId: 86068548-ef56-407f-a72b-82627c82aa09 Version: $LATEST
2022-04-13T15:22:53.618Z	86068548-ef56-407f-a72b-82627c82aa09	INFO	EVENT: {}
END RequestId: 86068548-ef56-407f-a72b-82627c82aa09
REPORT RequestId: 86068548-ef56-407f-a72b-82627c82aa09	Duration: 3.12 ms	Billed Duration: 4 ms	Memory Size: 1024 MB	Max Memory Used: 56 MB	Init Duration: 200.67 ms
```

Below is a description of what these log fields mean:

- *Duration*: The exact duration of the request.
- *Billed Duration*: The billed duration of the request
- *Memory size*: Memory your Function had available, default on 1024MB
- *Memory used*: Memory your function consumed during execution.
- *Init duration*: Time it took to prepare and start the function (also known as the "cold start").

<screenshot-execute-hello-world>

## Writing our own function

Now let's try something more interesting and write our own Function from scratch! Before we do that, it's helpful to explain how an input event is handled by Functions and how you should program this. 

### Function handler

You may have noticed in the first example that the first line of code starts with: 

```exports.handler = async function (event, context)```

This is referred to as the Function handler method, and will be the entry point where our code starts. There are two mandatory inputs for the handler function:

- `event` contains the input event for the execution (i.e. from the Stedi API call or from Stedi Terminal). You can control the information that goes into the event object. 

- `context` contains information about the invocation, Function and execution environment. This information is automatically provided by Stedi Functions.

We _always_ need to submit both objects to our handler as inputs, but we can also leverage these objects in the code itself.  


### Function return values

There is another requirement for our Function to work - it always needs to return an output using a `return` (even an empty `{}` output is fine, as long as it returns something). This is the signal for the Function to know running of your code is complete and that it can stop the Function. You could see the same in the very first code example we ran at the bottom:

`return {
    logStreamName: context.logStreamName
  };`

For the rest, it's up to you to decide what your function does in code.

### Create a new Function

Now that we went over some rules, go ahead and create a new Stedi Function in Terminal, which you can call "Greeter Function" if you like. In this function, we take the input from the event handler, add a simple string and return it back to the client. The function is only a few lines long; 

```js
exports.handler = async function (event, context) {
  const greeter = `Well hello, my dear ${event.name}.`;

  console.log(greeter);

  return greeter;
};
```

Feel free to copy/paste this code into the new Function editor and press save. What's different with this Function is that we can submit an input to it, which will be received by the event handler. 

The easiest way to test this is by going to the "edit execution payload" button on the functions page and adding the following JSON event. The execution payload is helpful for testing your function as you can precisely control what data is submitted through it. 

```
{
    "name": "Stedi"
}
```

The "name" input from this document will map to $event.name in the function. In this way, we can dynamically feed input data to our Lambda invoke. While we used the execution event in this sample, you can also submit this data through the Stedi API. 

### Conclusion

This concludes the hello world tutorial. If you are eager to learn more, we encourage to [take a look at the 'web request' tutorial](https://github.com/Stedi/starter-kit/tree/function-samples/stedi-cloud/functions/web-request) next.