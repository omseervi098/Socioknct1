import env from "../config/environment.js";
import transporter from "../config/nodemailer.js";
import { forgetpasshtml } from "../views/forgetpass.js";
async function forgetpass(user, link) {
  try {
    let htmlString = await forgetpasshtml(user, link);
    let info = await transporter.sendMail({
      from: env.smtp.auth.user,
      to: user.email,
      subject: "Socioknct | Reset Password",
      html: htmlString,
    });
    console.log("Message sent: %s", info);
  } catch (err) {
    console.log(err);
    // return err;
  }
}
export default forgetpass;
