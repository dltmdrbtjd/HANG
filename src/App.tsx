import React from 'react';
import Input from './elements/Input';

const App = () => {
  return (
    <>
      <div className="App">웰컴투 타입스크립트</div>
      <Input
        placeholder="여행자/길잡이를 검색하세요"
        radius="40px"
        padding="11px 45px 11px 23px"
        fs="14px"
      />
    </>
  );
};

export default App;
