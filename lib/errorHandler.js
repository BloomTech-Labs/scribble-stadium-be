/**
 * This function assesses the Error object passed in and returns a specific
 * reponse to the client based on which error was thrown
 * @param {Object} res the response object from the router endpoint
 * @param {Error} error an Error instance, usually from a catch statement
 * @param {String} name the singular name of the data object being operated on
 */
const send = (res, error, name = '') => {
  console.log({ error: error.message });
  let status, message;
  if (error.message.includes('NotFound')) {
    status = 404;
    message = `${name}NotFound`;
  } else if (
    error.message.includes('Empty .update() call detected!') ||
    error.message.includes('Undefined binding(s) detected')
  ) {
    status = 400;
    message = `Missing parameters.`;
  } else if (error.message.includes('violates foreign key constraint')) {
    status = 404;
    message = `Invalid${name}ID`;
  } else if (error.message.includes('violates unique constraint')) {
    status = 403;
    message = 'Could not submit duplicate.';
  } else if (error.message.includes("read property 'map'")) {
    status = 400;
    message = 'InvalidFormData';
  } else if (error.message.includes('invalid input value for enum')) {
    status = 400;
    message = 'Value not allowed.';
  } else if (/column.+of relation.+does not exist/g.test(error.message)) {
    status = 400;
    message = `Invalid${name}`;
  } else if (/Cannot read property.+of undefined/g.test(error.message)) {
    status = 404;
    message = `Invalid${name}`;
  } else {
    status = 500;
    message = error.message;
  }
  res.status(status).json({ error: message });
};

module.exports = {
  send,
};
