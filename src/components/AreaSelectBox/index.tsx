import React from 'react';
import { Grid, Ul } from 'src/elements';
import CityArr from './cityArr';

export interface Props {
  toggle?: boolean;
}

const AreaSelectBox: React.FC<Props> = ({
  toggle,
  ...props
}): React.ReactElement => {
  const [currentCity, setCurrentCity] = React.useState<number>(0);
  const [currentGu, setCurrentGu] = React.useState<number>(0);

  const [cityName, setCityName] = React.useState<string>('');
  const [guName, setGuName] = React.useState<string>('');

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
          <Ul>ㅎㅇ</Ul>
          <Ul>ㅎㅇ</Ul>
        </Grid>
      ) : null}
    </>
  );
};

export default AreaSelectBox;
