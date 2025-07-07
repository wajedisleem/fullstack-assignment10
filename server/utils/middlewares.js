const endPointNotFound = (req, res) => {
  // TO DO: return 404 and not found message 
  res.sendStatus(404);
};

module.exports = {
  endPointNotFound,
};
