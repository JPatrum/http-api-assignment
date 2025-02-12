const fs = require('fs');

const main = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getMain = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(main);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getMain,
  getCSS,
};
