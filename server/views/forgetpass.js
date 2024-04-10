export const forgetpasshtml = async (user, link) => {
  return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Socioknct</title>
    <style>
      @import
      url('https://fonts.googleapis.com/css?family=Poppins:400,700,900');
    </style>
  </head>

  <body style="">
    <div style="background-color:#efefef;gap:10px;font-family:'poppins';">
      <div style="background-color:#1B8DFF;padding: 10px;">
        <div style="color:white;font-size: 1.5rem;">Socioknct &lt;/&gt;</div>
      </div>
      <div style="font-size: 0.9rem;padding:10px;">
        <div style="padding-bottom: 15px;padding-top:15px">Hello ${user.name},</div>
        <div style="padding-bottom:10px;text-align: justify;">
          We’ve received a request to reset your password on{" "}
          <a
            style="color:#1B8DFF;text-decoration: none;"
            href="https://socioknct.vercel.app"
          >
            Socioknct
          </a>
          .
        </div>
        <div style="text-align: justify;">
          if you didn’t make the request, just ignore this message. Otherwise
          you can reset your password.
        </div>
      </div>
      <div style="padding:10px;margin:0 auto">
        <div style="background-color: #1B8DFF;text-align: center;padding:5px;border-radius:10px;max-width:fit-content;margin:0 auto;">
          <a
            href=${link}
            style="font-size: 1.1rem;color:white;text-decoration: none;"
          >
            Reset Password
          </a>
        </div>
      </div>
      <div style="font-size: 0.9rem;padding:10px;">
        <div>Regards,</div>
        <div>Team Socioknct</div>
      </div>
    </div>
  </body>
</html>
`;
};
