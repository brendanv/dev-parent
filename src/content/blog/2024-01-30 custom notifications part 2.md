---
title: Custom shared notifications with Shortcuts and ntfy.sh, part 2
description: Let’s add some AI-generated jokes because AI is all the rage.
pubDatetime: 2024-01-30T17:09:05.367Z
slug: custom-shared-notifications-shortcuts-ntfy-part-2
tags:
  - shortcuts
  - ai
---

In [part 1 of this guide](/posts/custom-shared-notifications-shortcuts-ntfy-part-1/) we set up custom notifications that you or your partner can trigger to discreetly let the other person know that some task has been done. I suggest you read that if you haven’t already, because we’re going to continue building on those foundations. Now, let’s make it more fun!

I wanted to make the notifications a little more whimsical or delightful so I decided to have an LLM generate a custom joke for me related to the notification every time it’s sent. Let’s see how to do that.

## Get an OpenAI API key

Yes, for this to work, you will eventually have to pay a small amount of money. Don’t worry though, I’ve been using this for several months and have received maybe $1 or $2 (total!) in bills that are attributable to these notifications. Unless you’re sending notifications _constantly_ the volume will be so low as to make the bill almost nonexistent.
So head on over, set up an account, and grab your API key. I’m not going to explain how to do that here, but OpenAI has [some docs](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key) that should be enough to get you started.

## Prompt

I chose to completely ignore the wide world of prompt engineering and just write a basic prompt. If you want to go more in depth and have the most finely crafted artisinal jokes that an AI can generate, there’s more details available [here](https://platform.openai.com/docs/guides/prompt-engineering).

For our use case we just need two basic prompts.

First, there’s the “system” prompt in which you can describe how your AI should behave. Here you define “who you’re talking to”.

Next, there’s the “user” prompt which repsresents the request you make to the AI you described in the system prompt. This is “what you’re asking”.

Our notifications are very simple so don’t overthink it. I went with the following:

```
System: “you are a helpful assistant that likes to tell jokes and make puns”
User: “in 15 words or less, tell me a joke about X”
```

## Generating the joke in Shortcuts

### Constructing the request

Similar to the ntfy.sh shortcut we built in [part 1](/posts/custom-shared-notifications-shortcuts-ntfy-part-1/), the core component of our AI-generated joke will be the “Get Contents of URL” action. Specifically, we’ll be using the [chat completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) to generate our jokes.

You’ll need to manually construct the JSON body using a Text field and then convert it into a dictionary before passing it into the Get Contents of URL action. Take a look at the [full API spec](https://platform.openai.com/docs/api-reference/chat) if you want to do anything fancy, but the core of your message should look like this:

```
{
  “messages”: [
    {
      “role”: “system”,
      “content”: “<<YOUR SYSTEM PROMPT>>”
    },
    {
      “role”: “user”,
      “content”: “<<YOUR USER PROMPT>>”
    }
  ],
  “model”: “gpt-3.5-turbo”
}
```

Feel free to change the model to `gpt-4` if you’re feeling fancy. I’ve found the `gpt-3.5-turbo` is more than sufficient for this purpose.

### Sending the request

Now we just pipe that dictionary into the Get Contents of URL action to hit the chat completion API endpoint. You’ll also need to make two changes to the headers to make sure that your request is processed successfully:

```
Authorization: Bearer <<YOUR API KEY>>
Content-Type: application/json
```

Once you’re done, the overall structure of your request should look something like this. Note that I have my API key stored in a variable from earlier in the shortcut.

![request content](@assets/images/2024/01/custom_notifs_part2/request_content.png)

### Processing the response

The chat completions API sends back a nice JSON response that we need to handle in order to actually see the joke that the AI generated for us. From the Open AI docs an example response may look like this:

```
{
  “choices”: [
    {
      “finish_reason”: “stop”,
      “index”: 0,
      “message”: {
        “content”: “The 2020 World Series was played in Texas at Globe Life Field in Arlington.”,
        “role”: “assistant”
      },
      “logprobs”: null
    }
  ],
  “created”: 1677664795,
  “id”: “chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW”,
  “model”: “gpt-3.5-turbo-0613”,
  “object”: “chat.completion”,
  “usage”: {
    “completion_tokens”: 17,
    “prompt_tokens”: 57,
    “total_tokens”: 74
  }
}
```

Really all we care about is `choices[0].message.content` for our notification. You can feel free to parse anything else from the response that you want, but the only thing that’s purely necessary is the message content. (I also chose not to add any error handling because I’m lazy and this isn’t mission-critical…).

To extract the message content I used the following approach:

![parsing response](@assets/images/2024/01/custom_notifs_part2/parsing_response.png)

## Putting it all together

All that’s left is to pipe the joke into our notification trigger from [part 1](/posts/custom-shared-notifications-shortcuts-ntfy-part-1/). Your joke content should go into the `message` key in the request body to ntfy.sh. Now when you run your notification shortcut, it will call the chat completions API, generate a new, unique joke, and then send that joke to you and your spouse in a notification!

![example notification](@assets/images/2024/01/custom_notifs_part2/notification_result.png)

The jokes can range from chuckle-worthy to bad or confusing (“what was the joke it was _trying_ to make?”) but at least they lend some variety to your notifications.
