export const verifyemailhtml = async (user, otp) => {
  return `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      @import url('https://fonts.googleapis.com/css?family=Poppins:400,700,900');
    </style>
  </head>
  <body style="">
    <div  style="background-color:#efefef;gap:10px;font-family:'poppins';">
      <div  style="background-color:#1B8DFF;padding: 10px;">
        <div style="color:white;font-size: 1.5rem;display:flex;align-items:center;">
          Socioknct <image src="https://socioknct.vercel.app/logo2_bg.png"  alt="logo" style="margin-left:10px;width:30px;height:30px;"/>
        </div>
      </div>
      <div style="font-size: 0.9rem;padding:10px;">
        <div style="padding-bottom: 15px;padding-top:15px">
        Hello ${user.name},
        </div>
        <div style="padding-bottom:10px;text-align: justify;">
        Thank you for choosing <span style="color:#1B8DFF;">Socioknct</span>. Use this OTP to Complete your Sign Up procedures and verify your account on <span style="color:#1B8DFF;">Socioknct</span>.
        </div>
        <div style="text-align: justify;">
        Remember, Never share this OTP with anyone, not even if <span style="color:#1B8DFF;">Socioknct</span> ask you,
        </div>
      </div>
      <div style="padding:10px;">
        <div style="background-color: #1B8DFF;text-align: center;width:fit-content;margin:0 auto;">
          <div style="font-size: 1.5rem;color:white;padding:10px;">${otp}</div>
        </div>
        <div style="padding-top:2px;text-align:center;font-size: 0.8rem;"> (OTP valid for 10 min)</div>
      </div>
      <div  style="font-size: 0.9rem;padding:10px;">
        <div>Regards,</div>
        <div>Team Socioknct</div>
      </div>
    </div>
  </body>
</html>
`;
};
