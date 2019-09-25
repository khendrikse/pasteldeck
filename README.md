# PastelDeck
<div align="center">
  <img src="https://github.com/khendrikse/PastelDeck/blob/master/assets/pasteldeck.gif" width="200" alt="icon">
</div>

PastelDeck is a CLI that helps you transform a markdown file into a simple html-based slideshow. Perfect for when you want to focus on content with a pretty looking outcome.

## Example

## Install

With yarn:
```
$ yarn global add PastelDeck
```

With npm:
```
$ npm install -g PastelDeck
```

## How can you use it?

Create your presentation in a markdown file. Make sure to follow the [supported format](#formatting) for PastelDeck.

Inside your terminal, navigate to the folder containing your markdown file and run:

```
$ pasteldeck
```

After this the CLI will walk you through selecting the markdown file to convert into the slideshow, and you will be able to select a theme colour.

## Themes

Currently PastelDeck supports the following themes:

* Pink
* Salmon
* Purple
* Yellow
* Green
* Blue

## Formatting

### Creating a slide

To create a slide, add a horizontal rule in markdown. Anything after the horizontal rule is part of the slide.
```md
---

## This is part of slide 1

This is also part of slide 1!

---

## This is part of slide 2

This is also part of slide 2!
```

### Supported markdown

PastelDeck supports normal markdown syntax. Only horizontal rules using
```
---
```

Is not supported as it is used to divide sections into slides.
