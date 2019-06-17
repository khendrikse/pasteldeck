const fs = require("fs");
const path = require('path');
const showdown = require("showdown");
const converter = new showdown.Converter();
const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), "utf8", (data) => data);

function createPastelDeck(markDownFile) {
  const fileName = `${markDownFile.split('.')[0]}.html`;
  const markdownContent = fs.readFileSync(
    markDownFile,
    "utf8",
    (err, data) => data
  );

  // Functions
  const createNav = data => {
    const headers = data
      .split("\n")
      .filter(item => !item.includes("###") && item.includes("## "))
      .map(item => item.slice(2, item.length))
      .map((item, i) => `<li><a href='#${i}'>${item}</a></li>`)
      .join("");

    return headers;
  };

  const setSectionId = data => {
    let num = 0;

    return data
      .replace(/---/g, function() {
        const sectionHTML = `<section id='${num}' markdown>`;
        if (num === 0) return ++num && sectionHTML;
        return ++num && `</section>${sectionHTML}`;
      })
      .concat("</section>");
  };

  const createFile = (template, markdownContent) => {
    const cleanedSections = setSectionId(markdownContent);
    const navigation = createNav(cleanedSections);
    const content = converter.makeHtml(cleanedSections);
    const templateArray = template.split("// split");
    const joinedContent = [
      templateArray[0],
      navigation,
      templateArray[1],
      content,
      templateArray[2]
    ].join("");

    fs.writeFile(fileName, joinedContent, err => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  };

  createFile(template, markdownContent);
}

module.exports = createPastelDeck;
