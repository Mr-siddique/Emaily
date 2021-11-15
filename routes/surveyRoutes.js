const requireLogin = require("../middlewares/requireLogin");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireCredits = require("../middlewares/requireCredits");
// const Mailer = require("../services/Mailer");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const sendInBlueApi = require("sib-api-v3-sdk");
const defaultClient = sendInBlueApi.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = require("../config/keys").sendBlueKey;
const apiInstance = new sendInBlueApi.TransactionalEmailsApi();
let sendSmtpEmail = new sendInBlueApi.SendSmtpEmail();
module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    const pathname = new URL(req.body.link).pathname;
    const p = new Path("/api/surveys/:surveyId/:choice");
    const match = p.test(pathname);
    const event = {
      email: req.body.email,
      surveyId: match.surveyId,
      choice: match.choice,
    };
    Survey.updateOne(
      {
        _id: event.surveyId,
        recipients: {
          $elemMatch: {
            email: event.email,
            responded: false,
          },
        },
      },
      {
        $inc: { [event.choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded:new Date()
      }
    ).exec();
    res.send({});
  });
  app.get('/api/surveys',requireLogin,async (req,res)=>{
    const surveys=await Survey.find({_user:req.user._id}).select({recipients:false});
    res.send(surveys);
  })
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user._id,
      dateSent: Date.now(),
    });
    sendSmtpEmail.subject = survey.subject;
    sendSmtpEmail.htmlContent = surveyTemplate(survey);
    sendSmtpEmail.sender = {
      name: "emaily-dev",
      email: "mrsiddique6august@gmail.com",
    };
    sendSmtpEmail.to = survey.recipients.filter((recipient) =>
      JSON.stringify({
        email: recipient.email,
        name: recipient.email.substr(0, 4),
      })
    );
    sendSmtpEmail.params = { subject: survey.subject };
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
