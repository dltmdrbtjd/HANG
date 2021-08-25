import React from 'react';
// icon
import BlockIcon from '@material-ui/icons/Block';
// apis
import apis from 'src/shared/api';
// redux
import { shallowEqual, useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import {
  MyPageCreators,
  DeleteBlockList,
} from 'src/redux/modules/MyPageModule/mypage';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// elements
import { Grid, Text, Button, Container } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
import ToastMessage from '../../../components/ToastMessage';
import NoInfo from '../../../components/NoInfo';
// image
import blockednotfound from '../../../Images/notfound/blockednotfound.png';

const Block = () => {
  const dispatch = useDispatch();
  const { blockList, message } = useTypedSelector(
    (state) => ({
      blockList: state.mypage.blockList,
      message: state.toastMessage.Message,
    }),
    shallowEqual,
  );

  React.useEffect(() => {
    dispatch(MyPageCreators.fetchGetBlockList());
  }, []);

  const deleteBlockList = (targetPk: number) => {
    apis
      .DeleteBlockList({ targetPk })
      .then(() => {
        dispatch(DeleteBlockList(targetPk));
        dispatch(fetchMessage({ Message: true }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container padding="66px 0 80px 0">
      <NoInfo
        list={blockList}
        contents="차단목록에 추가된 사람이 없습니다."
        imageUrl={blockednotfound}
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
                  {block.nickname}
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
                차단됨 <BlockIcon style={{ marginLeft: '4px' }} />
              </Button>
            </Grid>
          );
        })}

        {message && <ToastMessage msg="차단 해제됐습니다." />}
      </NoInfo>
    </Container>
  );
};

export default Block;
