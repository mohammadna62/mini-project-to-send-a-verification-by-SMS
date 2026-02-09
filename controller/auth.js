const request = require("request");
require("dotenv");
module.exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(Math.random() * 99999);
  console.log("OTP Code ->", code);

  try {
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: process.env.USER,
          pass: process.env.PASSWORD,
          fromNum: "3000505",
          toNum: phone,
          patternCode: process.env.PATTERNCODE,
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      function (error, response, body) {
        console.log(response.body);
        if (!error && response.statusCode === 200) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          console.log(response.body[0]);
          if (
            typeof response.body !== "number" &&
            Number(response.body[0]) !== 0
          ) {
            return res.status(500).json({ message: response.body[1] });
          }
          return res
            .status(200)
            .json({ message: "OTP Code Send Successfully" });
        } else {
          console.log("whatever you want");
        }
      },
    );
  } catch (err) {}
};
