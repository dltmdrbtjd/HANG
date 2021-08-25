import { phoneRegExp, idRegExp, pwdRegExp } from "../validation";

describe('휴대폰번호 및 아이디,비밀번호를 입력했을때', () => {

    // 휴대폰 번호 양식 검증
    const phoneNum = '01046101532';
    const phoneNum2 = '00022224444';

    // 숫자 양식 검증
    const numberTest = '12344567aa';

    // hyphen 검증
    const hyphen = '010-4610-1532';

    // 아이디 검증
    const id = 'verdugo';
    const id1 = 'verdugo12';
    const id2 = 'verdugo123@@';

    // 비밀번호 검증
    const pw = '12341234';
    const pw1 = '1234asd';
    const pw2 = '1234@#asd';
    const pw3 = '1234``asd';

  test('휴대폰번호 양식에 맞으면 true를 반환한다.', () => {
    expect(phoneNum).toMatch(phoneRegExp.phoneNumber);
    expect(phoneNum2).not.toMatch(phoneRegExp.phoneNumber);
  });
  test('숫자가 맞으면 true를 반환한다.', () => {
    expect(numberTest).not.toMatch(phoneRegExp.number);
    expect(phoneNum).toMatch(phoneRegExp.number);
  });
  test('hyphen이 들어가있으면 false를 반환한다.', () => {
    expect(hyphen).not.toMatch(phoneRegExp.hyphen);
    expect(phoneNum).toMatch(phoneRegExp.hyphen);
  });
  test('아이디를 양식에 맞게 입력하면 true를 반환한다.', () => {
    expect(id).toMatch(idRegExp);
    expect(id1).toMatch(idRegExp);
    expect(id2).not.toMatch(idRegExp);
  });
  test('비밀번호를 양식에 맞게 입력하면 true를 반환한다.', () => {
    expect(pw).toMatch(pwdRegExp);
    expect(pw1).toMatch(pwdRegExp);
    expect(pw2).toMatch(pwdRegExp);
    expect(pw3).not.toMatch(pwdRegExp);
  });
});