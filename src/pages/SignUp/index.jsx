import React from 'react';
// components
import StatusBar from './StatusBar';
// pages
import SignUpPage1 from './Page1';
import SignUpPage2 from './Page2';
import SignUpPage3 from './Page3';

const SignUp = ({ match }) => {
  let { page } = match.params;
  page = parseInt(page, 10);

  return (
    <>
      <StatusBar curPage={page} />
      {page === 1 ? <SignUpPage1 /> : null}
      {page === 2 ? <SignUpPage2 /> : null}
      {page === 3 ? <SignUpPage3 /> : null}
    </>
  );
};

export default SignUp;
