import nodemailer from "nodemailer";
import env from "./environment.js";

//Part which send emails
let transporter = nodemailer.createTransport(env.smtp);

export default transporter;
