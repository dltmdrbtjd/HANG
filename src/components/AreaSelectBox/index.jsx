import React, { useState, useEffect } from 'react';
import { Grid } from '../../elements/index';
import CityTab from './style';
import CityArr from './cityArr';

const AreaSelectBox = ({ toggle, ...props }) => {
  const [currentCity, setCurrentCity] = useState(0);
  const [currentGu, setCurrentGu] = useState(0);

  const [cityName, setCityName] = useState('');
  const [guName, setGuName] = useState('');

  const SelectCityHanlder = (idx, city) => {
    setCurrentCity(idx);
    setCurrentGu(0);
    setCityName(city);
    if (idx === 0) {
      setGuName('종로구');
    } else if (idx === 1) {
      setGuName('중구');
    } else {
      setGuName('제주시');
    }
  };

  const SelectCurrentGu = (idx, gu) => {
    setCurrentGu(idx);
    setGuName(gu);
    if (!cityName) {
      setCityName('서울특별시');
    }
  };

  useEffect(() => {
    props.setCity(cityName);
    props.setGu(guName);
  }, [cityName, guName]);

  return (
    <>
      {toggle ? (
        <Grid
          width="100%"
          radius="14px"
          padding="12px"
          bgColor="semiLightG"
          isFlex
          hoz="space-between"
        >
          <CityTab>
            {CityArr.map((ele, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    currentCity === idx ? 'submenu focused' : 'submenu'
                  }
                  onClick={() => SelectCityHanlder(idx, ele.city)}
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
                  onClick={() => SelectCurrentGu(idx, ele)}
                >
                  {ele}
                </li>
              );
            })}
          </CityTab>
        </Grid>
      ) : null}
    </>
  );
};

export default AreaSelectBox;
