import React from 'react';
// icon
import BlockIcon from '@material-ui/icons/Block';
// apis
import apis from 'src/shared/api';
// redux
import { shallowEqual, useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import { DeleteBlockList } from 'src/redux/modules/MyPageModule/mypage';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// elements
import { Grid, Text, Button, Container } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
import NoInfo from '../../../components/NoInfo';

const Block = () => {
  const dispatch = useDispatch();
  const { blockList } = useTypedSelector(
    (state) => ({
      blockList: state.mypage.blockedUsers,
    }),
    shallowEqual,
  );

  const deleteBlockList = (targetPk: number) => {
    apis
      .DeleteBlockList({ targetPk })
      .then(() => {
        dispatch(DeleteBlockList(targetPk));
        dispatch(fetchMessage({ Message: true, text: '차단 해제되었습니다.' }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container padding="66px 0 80px 0">
      <NoInfo
        list={blockList}
        contents="차단목록에 추가된 사람이 없습니다."
        imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/blockednotfound.png"
      >
        {blockList.map((block, idx) => {
          return (
            <Grid
              isFlex
              hoz="space-between"
              ver="center"
              border="0.5px solid #E7E7E7"
              borDirection="bottom"
              padding="20px 0"
              key={(Date.now() + Math.random() + idx).toString(36)}
            >
              <Grid width="75%" addstyle="flex: 1" isFlex ver="center">
                <ProfileImg imgUrl={block.profileImg} />

                <Text fs="la" fw="bold" margin="0 0 0 24px">
                  {block.nickname || '이미 탈퇴한 유저입니다.'}
                </Text>
              </Grid>

              <Button
                isFlex
                ver="center"
                form="text"
                fs="xs"
                color="brandColor"
                _onClick={() => deleteBlockList(block.userPk)}
              >
                {block.nickname ? '차단됨' : '삭제하기'}{' '}
                <BlockIcon style={{ marginLeft: '4px' }} />
              </Button>
            </Grid>
          );
        })}
      </NoInfo>
    </Container>
  );
};

export default Block;
