import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import { AlarmCreators } from 'src/redux/modules/AlarmModule/alarm';
import { limitWidth } from 'src/styles/Mixin';
import { Grid, Button, Container } from '../../elements';
import AlaremCard from './AlarmCard';
import NoInfo from '../../components/NoInfo';
import favoritenotfound from '../../Images/notfound/favoritenotfound.png';

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
    <Container padding="66px 0 80px 0">
      <NoInfo
        list={list}
        contents="아무런 알림이 없어요"
        imageUrl={favoritenotfound}
      >
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
          addstyle={limitWidth('600px')}
        >
          <Button width="100%" fs="la" _onClick={AlarmDeleteBtn}>
            전체삭제
          </Button>
        </Grid>
      </NoInfo>
    </Container>
  );
};

export default Noti;
