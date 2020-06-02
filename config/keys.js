if (process.env.NODE_ENV === "production") {
  //In Production
  module.exports = require("./prod");
} else {
  //In Development
  module.exports = require("./dev");
}
