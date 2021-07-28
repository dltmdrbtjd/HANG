import React from 'react';
// components
import SelectBox from '../../components/SelectBox';

const SignUp = () => {
  const contents = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  return <SelectBox initailOption="연령대 선택" contents={contents} />;
};

export default SignUp;
