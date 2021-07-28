import React, { useState } from 'react';
import { Grid } from '../../elements/index';
import CityTab from './style';
import CityArr from './cityArr';

const AreaSelectBox = () => {
  const [currentCity, setCurrentCity] = useState(0);
  const [currentGu, setCurrentGu] = useState(0);

  const SelectCityHanlder = idx => {
    setCurrentCity(idx);
    setCurrentGu(0);
  };

  const SelectCurrentGu = idx => {
    setCurrentGu(idx);
  };

  return (
    <Grid
      width="100%"
      radius="14px"
      padding="12px"
      bgColor="semiLightG"
      display="flex"
      hoz="space-between"
    >
      <CityTab>
        {CityArr.map((ele, idx) => {
          return (
            <li
              key={idx}
              className={currentCity === idx ? 'submenu focused' : 'submenu'}
              onClick={() => SelectCityHanlder(idx)}
            >
              {ele.city}
            </li>
          );
        })}
      </CityTab>
      <CityTab>
        {CityArr[currentCity].gu.map((ele, idx) => {
          return (
            <li
              key={idx}
              className={currentGu === idx ? 'submenu focused' : 'submenu'}
              onClick={() => SelectCurrentGu(idx)}
            >
              {ele}
            </li>
          );
        })}
      </CityTab>
    </Grid>
  );
};

export default AreaSelectBox;
