# PastelDeck

PastelDeck is a CLI that helps you transform a markdown file into a simple html-based slideshow. Perfect for when you want to focus on content with a pretty looking outcome.

Check out docs at https://pasteldeck.netlify.app/

## Install

With yarn:

```
$ yarn global add pasteldeck
```

With npm:

```
$ npm install -g pasteldeck
```

You can also use it without installing it first by running:

```
$ npx pasteldeck
```

## Built with
* [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)
* [inquirer-fuzzy-path](https://github.com/adelsz/inquirer-fuzzy-path)
* [open](https://github.com/sindresorhus/open#readme)
* [showdown](http://showdownjs.com/)
* [commitizen](https://github.com/commitizen/cz-cli)
* [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)

## How can you use it?

Create your presentation in a markdown file. Make sure to follow the [supported format](#formatting) for PastelDeck.

Inside your terminal, navigate to the folder containing your markdown file and run:

```
$ pasteldeck
```

After this the CLI will walk you through selecting the markdown file to convert into the slideshow, you will be able to select a theme colour and decide if they want to use watch mode or not.

## Themes

Currently PastelDeck supports the following themes:

- Pink
- Salmon
- Purple
- Yellow
- Green
- Blue

## Formatting

### Creating a slide

To create a slide, add a horizontal rule in markdown. Anything after the horizontal rule is part of the slide.

```md
---slide---

# This is part of slide 1 and this title will go in the index!

This is also part of slide 1!

---slide---

## This is part of slide 2 and this title will go in the index!

## This title will not be part of the index

This is also part of slide 2!

```

### Automatic indexing

Pasteldeck will automatically create a semi-hidden index for easy navigation by mouse (if you need it) by using the first heading of every slide.


### Supported markdown

PastelDeck supports normal markdown syntax that is also supported in ShowDown. [Check the documentation here](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax).
