// and set the environment variables. See http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   .then(message => console.log(message.sid));
// const sendSMSVerificationOTP = ({otp}) => {}
const sendSMSVerificationSuccess = ({ otp }) => { }
const sendSMS_OTP = ({ otp }) => { }
const sendSMSForgotPasswordSuccess = ({ otp }) => { }

module.exports = {
  // sendSMSVerificationOTP,
  sendSMSVerificationSuccess,
  sendSMS_OTP,
  sendSMSForgotPasswordSuccess,
}