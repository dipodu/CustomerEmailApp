const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3> HEY ID LIKE YOUR INPUT </h3>
          <p> Answer question </p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks"> YES</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks"> NO</a>
          </div>
      </div>
    </body>
  </html>
  `;
};
