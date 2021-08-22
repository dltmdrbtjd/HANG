import React from 'react';
import { Grid, List, Ul } from 'src/elements';
import CityArr from './cityArr';
import CityTab from './style';

export interface Props {
  toggle?: boolean;
  setCity: any;
  setGu: any;
  city?: number;
  region?: string;
}

// default값 사용하는 방법 !
// <AreaSelectBox city={지역(서울,부산,제주)의 index} region={해당 지역구(관악구,서초구,중구)}/>
// 이렇게 사용하시면 초기값 설정이 가능합니다. 혹시 안되면 말씀해주세요@@

const AreaSelectBox = ({ city, region, toggle, ...props }: Props) => {
  const [currentCity, setCurrentCity] = React.useState<number>(0);
  const [currentGu, setCurrntGu] = React.useState<number>(0);

  const [cityName, setCityName] = React.useState<string>('');
  const [guName, setGuName] = React.useState<string>('');

  const SelectCityHandler = (idx: number, city: string) => {
    setCurrentCity(idx);
    setCityName(city);
    if (idx === 0) {
      setGuName('강남구');
      setCurrntGu(0);
    } else if (idx === 1) {
      setGuName('강서구');
      setCurrntGu(0);
    } else {
      setGuName('구좌읍');
      setCurrntGu(0);
    }
  };

  const SelectCurrentGu = (idx: number, gu: string, cityNames: string) => {
    setCurrntGu(idx);
    setGuName(gu);
    setCityName(cityNames);
    props.setCity(cityNames);
  };

  React.useEffect(() => {
    let RegionNum;
    if (city === 0 || (city && region)) {
      RegionNum = CityArr[city].gu.indexOf(region);
      setCurrentCity(city);
      setCurrntGu(RegionNum);
    }
  }, []);

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
          margin="0 0 26px 0"
          bgColor="OpacityGray"
          isFlex
          hoz="space-between"
        >
          <Ul
            bgColor="bgColor"
            fw="regular"
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
            fw="regular"
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
                    SelectCurrentGu(idx, ele, CityArr[currentCity].city);
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
