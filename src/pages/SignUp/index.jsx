import React from 'react';
// components
import SelectBox from '../../components/SelectBox';
import StatusBar from './StatusBar';

const SignUp = ({ match }) => {
  const { page } = match.params;

  return (
    <>
      <StatusBar curPage={page} />
      <SelectBox initailOption="연령대 선택" />
    </>
  );
};

export default SignUp;
