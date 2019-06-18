const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const dirName = './assets';
const mainStyle = fs.readFileSync(
  path.resolve(__dirname, '../templates/main.css'),
  'utf8',
  data => data
);
const htmlTemplate = fs.readFileSync(
  path.resolve(__dirname, '../templates/index.html'),
  'utf8',
  data => data
);

function createNav(data) {
  const headers = data
    .split('\n')
    .filter(item => !item.includes('###') && item.includes('## '))
    .map(item => item.slice(2, item.length))
    .map((item, i) => `<li><a href='#${i}'>${item}</a></li>`)
    .join('');

  return headers;
}

function setSectionId(data) {
  let num = 0;

  return data
    .replace(/---/g, function() {
      const sectionHTML = `<section id='${num}' markdown>`;
      if (num === 0) return ++num && sectionHTML;
      return ++num && `</section>${sectionHTML}`;
    })
    .concat('</section>');
}

function createFile(template, markdownContent, fileName) {
  const cleanedSections = setSectionId(markdownContent);
  const navigation = createNav(cleanedSections);
  const content = converter.makeHtml(cleanedSections);
  const templateArray = template.split('// split');
  const joinedContent = [
    templateArray[0],
    navigation,
    templateArray[1],
    content,
    templateArray[2]
  ].join('');

  fs.writeFile(fileName, joinedContent, err => {
    if (err) throw err;
    console.log('✨ Cute PastelDeck awaits your attention! ✨');
  });
}

function checkDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function createAssets(theme) {
  checkDirectory(dirName);

  const themeStyle = fs.readFileSync(
    path.resolve(__dirname, `../templates/${theme}.css`),
    'utf8',
    data => data
  );

  fs.writeFile('assets/style.css', mainStyle, () => {});
  fs.writeFile('assets/theme.css', themeStyle, () => {});
}

function createPastelDeck(markDownFile, theme) {
  createAssets(theme);
  const fileName = `${markDownFile.split('.')[0]}.html`;
  const markdownContent = fs.readFileSync(
    markDownFile,
    'utf8',
    (err, data) => data
  );
  createFile(htmlTemplate, markdownContent, fileName);
}

module.exports = createPastelDeck;
