const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");

module.exports = (app) => {
  app.get("/api/survey/:surveyId/:choice", (req, res) => {
    res.send("Thanks for your input");
  });

  app.post("/api/survey/webhooks", (req, res) => {
    const parser = new Path("/api/survey/:surveyId/:choice");

    const events = _.map(req.body, ({ email, url }) => {
      const pathname = new URL(url).pathname;
      const matchFound = parser.test(pathname);

      if (matchFound) {
        return {
          email,
          surveyId: matchFound.surveyId,
          choice: matchFound.choice,
        };
      }
    });

    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    const updateEvents = () =>
      _.each(uniqueEvents, ({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      });

    updateEvents();

    res.send({});
  });

  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      //Assume user sent wrong data
      res.status(422).send(err);
    }
  });
};
