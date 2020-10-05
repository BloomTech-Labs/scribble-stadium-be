module.exports = {
  send: (res, error, name = '') => {
    // console.log({ error: error.message });
    let status, message;
    if (error.message.includes('NotFound')) {
      status = 404;
      message = `${name}NotFound`;
    } else if (error.message.includes('Empty .update() call detected!')) {
      status = 400;
      message = `Missing parameters.`;
    } else if (error.message.includes('Undefined binding(s) detected')) {
      status = 400;
      message = 'Missing parameters.';
    } else if (error.message.includes('violates foreign key constraint')) {
      status = 404;
      message = `Invalid${name}ID`;
    } else if (error.message.includes('violates unique constraint')) {
      status = 403;
      message = 'Could not submit duplicate.';
    } else if (error.message.includes("read property 'map'")) {
      status = 400;
      message = 'InvalidFormData';
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).json({ error: message });
  },
};
