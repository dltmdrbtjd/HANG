import React from 'react';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/configureStore';
// type
import { PromInfo } from 'src/redux/modules/MyPageModule/type';
// elements
import { SubTitle, Grid } from '../../../../elements';
// components
import PromiseCard from '../PromiseCard';
import NoInfo from '../../../../components/NoInfo';
// style
import { setMediaCardLayout } from '../../../../styles/Media';

const MyPromiseDetail = ({ type }: { type: string }) => {
  const promise = useSelector<RootState>((state) => state.mypage.promise);

  const pageBreak = {
    received: {
      title: '받은 요청',
      postComent: '받은 요청이 없습니다',
      guide: false,
    },
    requested: {
      title: '보낸 요청',
      postComent: '보낸 요청이 없습니다',
      guide: true,
    },
    confirmed: {
      title: '확정된 약속',
      postComent: '확정된 약속이 없습니다',
    },
  };

  return (
    <>
      <Grid margin="60px 0">
        <SubTitle fs="la" width="auto" margin="0 0 15px">
          {pageBreak[type].title}
        </SubTitle>

        <NoInfo
          list={promise[type]}
          contents={pageBreak[type].postComent}
          imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/eventnotfound.png"
        >
          <Grid addstyle={setMediaCardLayout()}>
            {promise[type].map((promInfo: PromInfo, idx: number) => (
              <PromiseCard
                key={(Date.now() + Math.random() * idx).toString(36)}
                type={type}
                guide={
                  {}.hasOwnProperty.call(pageBreak[type], 'guide')
                    ? pageBreak[type].guide
                    : promInfo.guide
                }
                promInfo={promInfo}
              />
            ))}
          </Grid>
        </NoInfo>
      </Grid>
    </>
  );
};

export default MyPromiseDetail;
