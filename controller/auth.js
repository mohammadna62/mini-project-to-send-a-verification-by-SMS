const request = require("request");
const otpModel = require("./../models/otp");
require("dotenv");
module.exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(Math.random() * 99999);
  const now = new Date();
  const expireAt = now.getTime() + 300_000;
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
      async function (error, response, body) {
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
          await otpModel.create({ phone, code, expireAt });
          return res
            .status(201)
            .json({ message: "OTP Code Send Successfully" });
        } else {
          console.log("whatever you want");
        }
      },
    );
  } catch (err) {}
};
