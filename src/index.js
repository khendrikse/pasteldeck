const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const open = require('open');

const converter = new showdown.Converter();
const dirName = './assets';
const mainStyle = fs.readFileSync(
  path.resolve(__dirname, '../templates/main.css'),
  'utf8',
  (data) => data
);
const htmlTemplate = fs.readFileSync(
  path.resolve(__dirname, '../templates/index.html'),
  'utf8',
  (data) => data
);
const slideScript = fs.readFileSync(
  path.resolve(__dirname, '../assets/slideScript.js'),
  'utf8',
  (data) => data
);

const SLIDE_SEPARATOR = '---slide---';
const HEADER_REGEX = /^#/g;
const HEADING_MARKERS = /(?:#)+ */;

function createNav(data) {
  return data
    .split(SLIDE_SEPARATOR)
    .map((part) => part.split('\n').find((item) => item.match(HEADER_REGEX)))
    .flat()
    .filter(Boolean)
    .map((item) => item.replace(HEADING_MARKERS, ''))
    .map((item, i) => `<li><a href='#${i}'>${item}</a></li>`)
    .join('');
}

function setSectionId(data) {
  let num = 0;

  return data
    .replace(/---slide---\n/g, function () {
      const sectionHTML = `<section id='${num}' markdown>`;
      if (num === 0) return ++num && sectionHTML;
      return ++num && `</section>${sectionHTML}`;
    })
    .concat('</section>');
}

function createFile({
  markDownFile,
  fileName,
  watchMode,
  enableIndex,
}) {
  const markdownContent = fs.readFileSync(
    markDownFile,
    'utf8',
    (err, data) => data
  );
  const cleanedSections = setSectionId(markdownContent);
  const navigation = enableIndex ? createNav(markdownContent) : '';
  const content = converter.makeHtml(cleanedSections);
  const templateArray = htmlTemplate.split('// split');
  const joinedContent = [
    templateArray[0],
    navigation,
    templateArray[1],
    content,
    templateArray[2],
  ].join('');

  fs.writeFile(fileName, joinedContent, (err) => {
    if (err) throw err;
    setTimeout(() => console.log('✨ Check out your cute PastelDeck! ✨'), 500);

    if (!watchMode) {
      open(fileName);
    }
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
    (data) => data
  );

  fs.writeFile('assets/style.css', mainStyle, () => {});
  fs.writeFile('assets/theme.css', themeStyle, () => {});
  fs.writeFile('assets/slideScript.js', slideScript, () => {});
}

function createPastelDeck({ markDownFile, theme, watchMode, enableIndex }) {
  console.log(`✨ ${theme} PastelDeck coming right up! ✨`);
  console.log(`✨ CTRL-C to shut down ✨`);

  createAssets(theme);
  const fileName = `${markDownFile.split('.')[0]}.html`;

  createFile({ markDownFile, fileName, enableIndex });

  if (watchMode) {
    fs.watchFile(markDownFile, (curr, prev) => {
      console.log('updating...');
      createFile({ markDownFile, fileName, watchMode, enableIndex });
      console.log('refresh your browser!');
    });
  }
}

module.exports = createPastelDeck;
