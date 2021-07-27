import React, { useEffect } from 'react';

// redux
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// style
import styled from 'styled-components';

// import 종류별로 주석처리
// usedispatch, useSelector 먼저 정의하고 사용

const Template = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);
  const { nick, age } = useSelector(
    state => ({
      nick: state.post.list,
      age: state.user.userage,
    }),
    shallowEqual,
  );

  // 함수 만들어서 사용하고

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <>
      <Example />
      {name}
      {age}
      {nick}
    </>
  );
};

Template.defaultProps = {
  name: null,
};

const Example = styled.div`
  height: 100%;
`;

export default Template;
