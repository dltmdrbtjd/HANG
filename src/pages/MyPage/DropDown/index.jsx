import React, { useState, useRef } from 'react';
// redux
import { useDispatch } from 'react-redux';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Button } from '../../../elements';
// style
import {
  RoomToggleWrapper,
  RoomToggleList,
} from '../../Chat/Room/RoomHeader/style';
// reducer
import { UserCreators } from '../../../redux/modules/user';

const DropDown = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logOut = () => {
    dispatch(UserCreators.logOutDB());
  };

  return (
    <>
      <Button
        padding="0"
        bgColor="bgColor"
        color="darkG"
        _onClick={handleToggle}
        ref={anchorRef}
      >
        <MoreVertIcon />
      </Button>

      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <RoomToggleWrapper top="130px">
            <RoomToggleList onClick={() => history.push('/mypage/modify')}>
              프로필 수정
            </RoomToggleList>
            <RoomToggleList onClick={logOut}>로그아웃</RoomToggleList>
          </RoomToggleWrapper>
        </ClickAwayListener>
      ) : null}
    </>
  );
};

export default DropDown;
