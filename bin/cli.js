#!/usr/bin/env node

const createPastelDeck = require('../src/index');
const inquirer = require('inquirer');

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

inquirer
  .prompt([
    {
      type: 'fuzzypath',
      itemType: 'file',
      name: 'markDownFile',
      message: 'Select the markdown file to transform',
      suggestOnly: false
    },
    {
      type: 'list',
      name: 'theme',
      message: 'What theme?',
      choices: ['Pink', 'Salmon', 'Purple', 'Yellow', 'Green', 'Blue'],
      filter: function(val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'confirm',
      name: 'watchMode',
      message: 'Want to start watchmode?',
      default: false
    },
    {
      type: 'confirm',
      name: 'enableIndex',
      message: 'Add index?',
      default: true
    }
  ])
  .then(answers => {
    createPastelDeck(answers);
  });
