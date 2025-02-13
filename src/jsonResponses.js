const respondJSON = (req, res, status, msg, resID = '') => {
  let content;
  let type;

  if (req.acceptedTypes[0] === 'text/xml') {
    type = 'text/xml';
    content = `<response><message>${msg}</message><id>${resID}</id></response>`;
  } else {
    const obj = {
      message: msg,
      id: resID,
    };
    type = 'application/json';
    content = JSON.stringify(obj);
  }

  console.log(content);

  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  res.write(content);
  res.end();
};

const getSuccess = (req, res) => {
  const msg = 'This is a successful response';
  respondJSON(req, res, 200, msg, '');
};

const getBadReq = (req, res) => {
  const valid = req.query.valid || req.query.valid === 'true';

  let msg = 'This request is valid';
  let id = '';
  let status = 200;

  if (!valid) {
    status = 400;
    msg = 'Missing valid query parameter set to true';
    id = 'badRequest';
  }

  respondJSON(req, res, status, msg, id);
};

const getUnauth = (req, res) => {
  const loggedIn = req.query.loggedIn === 'yes';

  let msg = 'This request is authorized (logged in)';
  let id = '';
  let status = 200;

  if (!loggedIn) {
    status = 401;
    msg = 'Missing loggedIn query parameter set to yes';
    id = 'unauthorized';
  }

  respondJSON(req, res, status, msg, id);
};

const getForbidden = (req, res) => {
  const msg = 'You do not have access to this content';
  const id = 'forbidden';

  respondJSON(req, res, 403, msg, id);
};

const getInternal = (req, res) => {
  const msg = 'Internal server error. Something went wrong.';
  const id = 'internalError';

  respondJSON(req, res, 500, msg, id);
};

const getNotImp = (req, res) => {
  const msg = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  const id = 'notImplemented';

  respondJSON(req, res, 501, msg, id);
};

const getNotFound = (req, res) => {
  const msg = 'The page you are looking was not found';
  const id = 'notFound';

  respondJSON(req, res, 404, msg, id);
};

module.exports = {
  getSuccess,
  getBadReq,
  getUnauth,
  getForbidden,
  getInternal,
  getNotImp,
  getNotFound,
};
