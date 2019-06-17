#!/usr/bin/env node

const createPastelDeck = require("./index");
const inquirer = require('inquirer');

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

inquirer
  .prompt([
    {
      type: 'fuzzypath',
      itemType: '.md',
      name: 'markdownFile',
      message: 'Select the markdown file to transform',
      suggestOnly: false,
      validate: function(value) {
        var pass = value.match(
          /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
        );
        if (pass) {
          return true;
        }

        return 'Please enter a valid phone number';
      }
    }
  ])
  .then(answers => {
    createPastelDeck(answers.markdownFile)
  });
