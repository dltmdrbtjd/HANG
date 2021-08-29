import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, Ul } from 'src/elements';
import CityArr from './cityArr';
import CityTab from './style';

export interface Props {
  setCity: any;
  setGu: any;
  city?: number;
  region?: string;
}

const AreaSelectBox = ({ city, region, ...props }: Props) => {
  const path = useLocation().pathname;

  const [currentCity, setCurrentCity] = React.useState<number>(0);
  const [currentGu, setCurrntGu] = React.useState<number>(0);

  const [cityName, setCityName] = React.useState<string>('');
  const [guName, setGuName] = React.useState<string>('');

  let Citys = CityArr;
  if (
    path.includes('/mypage/modify') ||
    path.includes('/signup') ||
    path.includes('/mypage/create_trip')
  ) {
    Citys = CityArr.filter((region) => region.gu.length > 1);
  }

  React.useEffect(() => {
    if (
      (path.includes('/mypage/modify') ||
        path.includes('/signup') ||
        path.includes('/mypage/create_trip')) &&
      city === 0
    ) {
      setCityName('서울');
      setGuName(region);
    }
  }, []);

  const SelectCityHandler = (idx: number, city: string) => {
    setCurrentCity(idx);
    setCityName(city);
    if (
      (path.includes('/mypage/modify') ||
        path.includes('/signup') ||
        path.includes('/mypage/create_trip')) &&
      idx === 0
    ) {
      setCityName('서울');
      setGuName('');
      setCurrntGu(0);
    } else if (
      !path.includes('/mypage/modify') &&
      !path.includes('/signup') &&
      !path.includes('/mypage/create_trip') &&
      idx === 0
    ) {
      setCityName('');
      setGuName('');
      setCurrntGu(0);
    } else {
      setGuName('');
      setCurrntGu(0);
    }
  };

  const SelectCurrentGu = (idx: number, gu: string, cityNames: string) => {
    setCurrntGu(idx);
    if (idx === 0) {
      setGuName('');
    } else {
      setGuName(gu);
    }
    setCityName(cityNames);
    props.setCity(cityNames);
  };

  React.useEffect(() => {
    let RegionNum;
    if (city >= 0 || (city && region)) {
      RegionNum = Citys[city].gu.indexOf(region);
      setCurrentCity(city);
      if (RegionNum < 0) {
        setCurrntGu(0);
        return;
      }
      setCurrntGu(RegionNum);
    }
  }, []);

  React.useEffect(() => {
    props.setCity(cityName);
    props.setGu(guName);
  }, [cityName, guName]);

  return (
    <>
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
          {Citys.map((ele: any, idx: number) => {
            return (
              <List
                key={idx}
                className={currentCity === idx ? 'submenu focused' : 'submenu'}
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
          {Citys[currentCity].gu.map((ele: any, idx: number) => {
            return (
              <List
                key={idx}
                className={currentGu === idx ? 'submenu focused' : 'submenu'}
                _onClick={() => {
                  SelectCurrentGu(idx, ele, Citys[currentCity].city);
                }}
              >
                {ele}
              </List>
            );
          })}
        </Ul>
      </Grid>
    </>
  );
};

export default AreaSelectBox;
