import React, { useState } from 'react';
// page
import PhoneAuth from './PhoneAuth';
import EnterPassword from './EnterPassword';

const ForgotPassword = () => {
  const [page, setPage] = useState(0);
  const [id, setId] = useState('');

  return (
    <>
      {page === 0 ? (
        <PhoneAuth setPage={setPage} id={id} setId={setId} />
      ) : null}
      {page === 1 ? <EnterPassword id={id} /> : null}
    </>
  );
};

export default ForgotPassword;
