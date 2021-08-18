import React from 'react';
import { Grid, List, Ul } from 'src/elements';
import CityArr from './cityArr';
import CityTab from './style';

export interface Props {
  toggle?: boolean;
  setCity: any;
  setGu: any;
}

const AreaSelectBox = ({ toggle, ...props }: Props) => {
  const [currentCity, setCurrentCity] = React.useState<number>(0);
  const [currentGu, setCurrntGu] = React.useState<number>(0);

  const [cityName, setCityName] = React.useState<string>('');
  const [guName, setGuName] = React.useState<string>('');

  const SelectCityHandler = (idx: number, city: string) => {
    setCurrentCity(idx);
    setCurrntGu(0);
    setCityName(city);
    if (idx === 0) {
      setGuName('강남구');
    } else if (idx === 1) {
      setGuName('강서구');
    } else {
      setGuName('구좌읍');
    }
  };

  const SelectCurrentGu = (idx: number, gu: string) => {
    setCurrntGu(idx);
    setGuName(gu);
    if (!cityName) {
      setCityName('서울특별시');
    }
  };

  React.useEffect(() => {
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
          bgColor="lightGray"
          isFlex
          hoz="space-between"
        >
          <Ul
            bgColor="bgColor"
            fw="bold"
            isFlex
            ver="align-items"
            textAlign="left"
            radius="14px"
            padding="10px 15px 10px 10px"
            width="49%"
            height="185px"
            overflow="auto"
            addstyle={CityTab}
          >
            {CityArr.map((ele: any, idx: number) => {
              return (
                <List
                  key={idx}
                  className={
                    currentCity === idx ? 'submenu focused' : 'submenu'
                  }
                  _onClick={() => {
                    SelectCityHandler(idx, ele.city);
                  }}
                >
                  {ele.city}
                </List>
              );
            })}
          </Ul>
          <Ul
            bgColor="bgColor"
            fw="bold"
            isFlex
            ver="align-items"
            textAlign="left"
            radius="14px"
            padding="10px 15px 10px 10px"
            width="49%"
            height="185px"
            overflow="auto"
            addstyle={CityTab}
          >
            {CityArr[currentCity].gu.map((ele: any, idx: number) => {
              return (
                <List
                  key={idx}
                  className={currentGu === idx ? 'submenu focused' : 'submenu'}
                  _onClick={() => {
                    SelectCurrentGu(idx, ele);
                  }}
                >
                  {ele}
                </List>
              );
            })}
          </Ul>
        </Grid>
      ) : null}
    </>
  );
};

export default AreaSelectBox;
