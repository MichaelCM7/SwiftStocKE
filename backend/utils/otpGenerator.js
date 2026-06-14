export function otpGenerator(){
  const digit1 = Math.floor(Math.random() * 10);
  const digit2 = Math.floor(Math.random() * 10);
  const digit3 = Math.floor(Math.random() * 10);
  const digit4 = Math.floor(Math.random() * 10);
  const digit5 = Math.floor(Math.random() * 10);
  const digit6 = Math.floor(Math.random() * 10);

  const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
  return otp;
}