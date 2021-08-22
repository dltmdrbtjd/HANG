import React from 'react';
// icon
import BlockIcon from '@material-ui/icons/Block';
// apis
import apis from 'src/shared/api';
// redux
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import {
  MyPageCreators,
  DeleteBlockList,
} from 'src/redux/modules/MyPageModule/mypage';
// elements
import { Grid, Text, Button, Container } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';

const Block = () => {
  const dispatch = useDispatch();
  const blockList = useTypedSelector((state) => state.mypage.blockList);

  React.useEffect(() => {
    dispatch(MyPageCreators.fetchGetBlockList());
  }, []);

  const deleteBlockList = (targetPk: number) => {
    apis
      .DeleteBlockList({ targetPk })
      .then(() => dispatch(DeleteBlockList(targetPk)))
      .catch((err) => console.log(err));
  };

  return (
    <Container padding="66px 0 80px 0">
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
    </Container>
  );
};

export default Block;
