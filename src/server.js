const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getMain,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBadReq,
  '/unauthorized': jsonHandler.getUnauth,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImp,
  notFound: jsonHandler.getNotFound,
};

const onRequest = (req, res) => {
  const protocol = req.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(req.url, `${protocol}://${req.headers.host}`);

  req.query = Object.fromEntries(parsedUrl.searchParams);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res);
  } else {
    urlStruct.notFound(req, res);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
