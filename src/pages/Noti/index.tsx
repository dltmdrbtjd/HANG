import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import { AlarmCreators } from 'src/redux/modules/AlarmModule/alarm';
import { Grid, Button } from '../../elements';
import maxWidth from './style';
import AlaremCard from './AlarmCard';

const Noti = () => {
  const dispatch = useDispatch();
  const list: any = useTypedSelector((state) => state.alarm.list);

  const AlarmDeleteBtn = () => {
    dispatch(AlarmCreators.fetchDeleteAlarm());
  };

  React.useEffect(() => {
    dispatch(AlarmCreators.fetchAlarmLoad());
  }, []);
  return (
    <Grid margin="-24px 0 80px" padding="90px 0 70px 0" overflow="auto">
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
        addstyle={maxWidth}
      >
        <Button width="100%" fs="la" _onClick={AlarmDeleteBtn}>
          전체삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default Noti;
