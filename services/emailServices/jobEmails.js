const transporter = require("../../configs/transporter");
const Job = require("../../models/Job");

const getApplicantFullName = (application) =>
  `${application.customDetails.firstName} ${application.customDetails.lastName}`;

const createEmailTemplate = (jobTitle, application) => {
  return `
    Subject: New Job Application for ${jobTitle}

    Dear Recruiter,

    I hope this message finds you well.

    We have received a new application for the position of **${jobTitle}**.

    **Applicant Details:**
    - **Name:** ${getApplicantFullName(application)}
    - **Email:** ${application.customDetails.email}
    - **Phone:** ${application.customDetails.phoneNumber}

    <p>You can review the application <a href="http://localhost:3000/jobs">here</a>.</p>
    
    You can review the application in the system.

    Best regards,

    [JobHub Team]  
  `;
};

const sendNewJobApplicationEmailToRecruiter = async (jobId, application) => {
  const job = await Job.findOne({
    _id: jobId,
  }).populate({
    path: "recruiter",
    select: "email",
  });

  transporter.sendMail(
    {
      from: process.env.GMAIL_USER,
      to: job.recruiter.email,
      subject: `New job application for ${job.title} - ${getApplicantFullName(
        application
      )}`,
      text: createEmailTemplate(job.title, application),
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
};

module.exports = { sendNewJobApplicationEmailToRecruiter };
