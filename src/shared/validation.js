const phoneRegExp =
  /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-{0}[0-9]{3,4}-{0}[0-9]{4}$/;

const idRegExp = /^[a-z]+[a-z0-9]/gi;

const pwdRegExp = /^[a-zA-Z0-9!@#$%^&*()?_~]/g;

export { phoneRegExp, idRegExp, pwdRegExp };
