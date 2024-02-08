---
author: Brendan Viscomi
pubDatetime: 2024-01-19T14:43:48.476Z
title: Custom shared notifications with Shortcuts and ntfy.sh, part 1
description: For when just one more notification can solve all your problems.
slug: custom-shared-notifications-shortcuts-ntfy-part-1
tags:
  - shortcuts
---

Sometimes daily life can get hectic and it feels like you and your partner are dealing with two separate mountains of things to do. On those days the small, unowned chores can fall down the priority list. How do you know if your partner already completed a task if you’re not together at the time and don’t want to bother them?

For stuff like this, I’ve found it useful to set up a small set of custom notifications that my partner and I can send to each other. We trigger the notification via Apple Shortcuts and both of us receive a matching notification on our phones. It ends up being an unobtrusive and passive way for us to let each other know that some small thing has been done.

## Setting up your notification channel

For delivering our notifications we’ll be using [ntfy.sh](https://ntfy.sh). This is an awesome service that lets you send notifications to any channel or “topic” using a simple HTTP request.

To start, come up with a unique topic name. Topics are public but as far as I know there’s no method for discovery, so you just want something that’s not easily guessable. It doesn’t need to be meaningful either; you can customize the notification such that you never even see the topic name if you choose.

Download the app for your mobile platform of choice and subscribe to your new topic. Now you should be able to send a quick notification to your device with a quick curl command:

```
curl -d “Testing!” ntfy.sh/yourtopic
```

## Sending notifications from Shortcuts

Let’s make this even more useful by building an easy way for us to trigger the notification from a phone.

Create a new Shortcut for the notification you’d like to send. The key ingredient in our Shortcut is the “Get Contents of URL” action. We need to hit the right URL with the right parameters to trigger a notification in our new channel.

- URL: https://ntfy.sh
- Method: `POST`
- Request Body: `JSON`
  - topic: `yourtopicname`
  - title: (whatever you want)
  - message: (whatever you want)

![shortcuts configuration](@assets/images/2024/01/custom_notifs_part1/shortcut.jpeg)

If you run your shotcut then you should receive a fancy notification on your phone!

![notification view](@assets/images/2024/01/custom_notifs_part1/ntfy.jpeg)

## Putting it all together

Now we have a Shortcut that can trigger a notification on our phone, great! But presumably _you_ remember when you perform one of your chores, so this isn’t immediately helpful. The next (and final!) step is to get a similar setup on your partner’s phone.

Download the ntfy.sh app and subscribe to the same topic. Now if you run the Shortcut on your phone, _both_ phones should get a notification.

Finally, share the Shortcut you created to the other phone (or any other iDevice you want to trigger the notifications). Then you should be able to trigger a notification on both phones using either device!

In [part two](/posts/custom-shared-notifications-shortcuts-ntfy-part-2) we’ll make these notifications a bit more fun and make it even easier to trigger these notifications without opening the shortcuts app.
