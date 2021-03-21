


  const URL = require("url").URL;

  const urlValid = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

  module.exports = {

    urlValid:urlValid
}