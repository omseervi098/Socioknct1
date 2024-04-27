import env from "../config/environment.js";
import { verifyemailhtml } from "../views/otpverify.js";
import transporter from "../config/nodemailer.js";
async function verifyemail(user, otp) {
  try {
    let htmlString = await verifyemailhtml(user, otp);
    let info = await transporter.sendMail({
      from: env.smtp.auth.user,
      to: user.email,
      subject: "Socioknct | Verify your email",
      html: htmlString,
    });
    console.log("Message sent: %s", info);
  } catch (err) {
    console.log(err);
    // return err;
  }
}
export default verifyemail;
