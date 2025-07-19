export function sendOTP(phoneNumber: string, countryCode: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`OTP sent to ${countryCode}${phoneNumber}`);
      resolve(true);
    }, 2000);
  });
}

export function verifyOTP(otp: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always accept "123456" as valid OTP for demo
      resolve(otp === '123456');
    }, 1500);
  });
}