import React, { useEffect } from 'react';
// icon
import BlockIcon from '@material-ui/icons/Block';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { MypageCreators } from '../../../redux/modules/mypage';
// elements
import { Grid, Text, Button } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';

const Block = () => {
  const dispatch = useDispatch();
  const blockList = useSelector(state => state.mypage.blockList);

  useEffect(() => {
    dispatch(MypageCreators.GetMyBlockListDB());
  }, []);

  const deleteBlockList = targetPk => {
    dispatch(MypageCreators.DeleteBlockListDB(targetPk));
  };

  return (
    <>
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
    </>
  );
};

export default Block;
