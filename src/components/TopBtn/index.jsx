import React from 'react';
// style
import TopBtnStyle from './style';

const TopBtn = () => {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return <TopBtnStyle onClick={handleTop}>TOP</TopBtnStyle>;
};

export default TopBtn;
