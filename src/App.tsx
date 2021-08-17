import React from 'react';
import AreaSelectBox from './components/AreaSelectBox';
import { Button } from './elements';

const App = () => {
  return (
    <>
      <div className="App">웰컴투 타입스크립트</div>
      <Button>열어 지역</Button>
      <AreaSelectBox toggle />
    </>
  );
};

export default App;
