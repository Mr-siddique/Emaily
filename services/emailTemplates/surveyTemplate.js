const { redirectDomain } = require("../../config/keys");
module.exports = (survey) => {
  return `
    <html>
     <body>
       <div style="text-align:center">
       <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div id="links">
        <a href="${redirectDomain}/api/surveys/${survey._id}/yes" target="_blank">Yes</a>
        <br/> <br/>
        <a href="${redirectDomain}/api/surveys/${survey._id}/no" target="_blank">No</a>
        </div>
       </div>
     </body>
    </html>
    `;
};
