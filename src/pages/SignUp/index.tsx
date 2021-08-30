import React from 'react';
// context
import SignUpContext from './SignUpContext';
// page
import SignUpWrapper from './SignUpWrapper';

const SignUp = () => {
  return (
    <SignUpContext>
      <SignUpWrapper />
    </SignUpContext>
  );
};

export default SignUp;
