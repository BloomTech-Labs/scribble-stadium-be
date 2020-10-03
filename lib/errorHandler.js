module.exports = (res, error, name = '') => {
  // console.log(error);
  if (error.message.includes('NotFound')) {
    res.status(404).json({ error: `${name}NotFound` });
  } else if (error.message.includes('violates foreign key constraint')) {
    res.status(404).json({ error: 'InvalidID' });
  } else {
    res.status(500).json({ message: error.message });
  }
};
