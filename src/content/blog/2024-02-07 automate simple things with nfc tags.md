---
title: Automating Simple Things with NFC Tags
description: Why unlock your phone when you can just tap?
pubDatetime: 2024-02-07T21:05:58.742Z
slug: automating-easy-things-with-nfc-tags

tags:
  - shortcuts
---

I’m probably (definitely) late to the game, but recently I found that it’s _really easy_ to setup NFC tags to trigger custom actions on your phone. Essentially, you link an NFC tag to a specific Shortcut so that any time you tap the NFC tag with your phone, the Shortcut automatically runs!

If you have a task that you do fairly often that is mildly tedious, then it might be worthwhile to spend a few minutes making it easier on yourself. Per [xkcd](https://xkcd.com/1205/):

![xkcd](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)

Luckily for us, once you acquire some NFC tags this whole process takes about 5 minutes so a lot of that chart is available to us!

## How it works

It’s actually quite simple and basically two steps.

First you need an NFC tag. Luckily, they’re super cheap and you can buy them in bulk. There’s a bunch of different types and I didn’t actually spend the time to research the difference. But luckily don’t need anything fancy - the key criteria is that it’s compatible with an iPhone and (IMO) that it’s a sticker. I bought [these](https://www.amazon.com/gp/product/B07P81ZLDW/).

Once you have the tags, open the Shortcuts app on your phone. Go to the `Automations` tab and click the + to add a new automation. Scroll down to find `NFC`. Click `Scan`and follow the instructions to tap your NFC tag to the phone.

From here on out it’s pretty self-explanatory. You can select whether the automation should run immediately or whether you want to confirm it first. And then you can select which Shortcut you want it to run.

## What could I automate?

If you’ve been following along so far, then you might notice that the notifications we created in [Custom shared notifications with Shortcuts and ntfy.sh](/posts/custom-shared-notifications-shortcuts-ntfy-part-2/) are a great place to start! You can put a NFC tag near wherever your chore lives and simply tap the tag when the job is done to let your partner know (and deliver a fun AI-generated joke too).

In addition to Shortcuts that you’ve created, automations can run a pretty large set of built-in tasks. OS-level actions like silencing notifications or setting an alarm are straightforward, along with app actions like logging samples to Apple Health or other fitness tracking apps.

I’ve personally used this to track water intake. I measured approximately how many ounces of water it takes to fill up the glasses in my house and then stuck an NFC tag near the refrigerator that logs that many ounces to Apple Health. That way I can see if I’m drinking enough water throughout the day.

## The sky is the limit

POST an HTTP request to your home automation server to turn off the living room lights. Scrape a news website homepage and display the most recent headlines. Since you can run arbitrary Shortcuts with this method you can trigger almost anything!
