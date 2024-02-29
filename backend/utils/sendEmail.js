const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  /* >> Create Email Transporter */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  /* >> Template with MailGen */
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      // Appears in header & footer of e-mails
      name: "Keipy Website",
      link: "https://keipy-app/",
      // link: "https://localhost:3000/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  const emailTemplate = mailGenerator.generate(template);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  /* >> Options for sending an email */
  const options = {
    from: process.env.EMAIL_USER,
    to: send_to,
    reply_to: reply_to,
    subject,
    html: emailTemplate,
    cc,
  };

  /* >> Send Email */
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
