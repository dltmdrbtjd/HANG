import timeFormat from "../timeFormat";

describe('서버에서 시간을 전달받았을때', () => {
  const date = new Date().getTime();
  const now = date - (59 * 1000);
  const minutes = date - (57 * 60 * 1000);
  const days = date - (3 * 24 * 60 * 60 * 1000);
  const month = date - (2 * 30 * 24 * 60 * 60 * 1000);

  test('1분 전에 받았을때 방금전을 반환한다.', () => {
    expect(timeFormat(now)).toEqual('방금 전');
  });
  test('1시간 전에 받았을때 57분 전을 반환한다.', () => {
    expect(timeFormat(minutes)).toEqual('57분 전');
  });
  test('3일 전에 받았을때 3일 전을 반환한다.', () => {
    expect(timeFormat(days)).toEqual('3일 전');
  });
  test('2달 전에 받았을때 6.27을 반환한다. (2021.08.26기준)', () => {
    expect(timeFormat(month)).toEqual('6.27');
  });
});