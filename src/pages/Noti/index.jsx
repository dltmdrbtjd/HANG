import React, { useEffect } from 'react';
// elements
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '../../elements';
// components
import AlaremCard from './AlarmCard';
// redux
import { AlarmCreators } from '../../redux/modules/alarm';

const Noti = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.alarm.list);

  const AlarmDeleteBtn = () => {
    dispatch(AlarmCreators.AlarmDeleteDB());
  };

  useEffect(() => {
    dispatch(AlarmCreators.AlarmLoadDB());
  }, []);
  return (
    <Grid margin="-24px 0 80px">
      {list
        ? list.map((item, idx) => {
            return <AlaremCard userInfo={item} key={idx} />;
          })
        : ''}

      <Grid
        width="90%"
        position="fixed"
        bottom="110px"
        left="50%"
        translate="-50%, 0"
        maxWidth="600px"
        tab="max-width: 768px"
      >
        <Button width="100%" fs="la" _onClick={AlarmDeleteBtn}>
          전체삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default Noti;
