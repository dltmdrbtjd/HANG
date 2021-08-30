import React from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// style
import { flexBox } from 'src/styles/Mixin';
import { SetArrowAngle } from 'src/pages/MyPage/CreateTrip/Calendar/style';
// context
import { signUpStatus } from '../../SignUpContext';
// elements
import {
  Button,
  Strong,
  Image,
  Grid,
  Ul,
  List,
  Span,
} from '../../../../elements';
// image
import Arrow from '../../../../Images/arrow.svg';

const SelectBox = () => {
  const { ageState } = React.useContext(signUpStatus);
  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  const [selectBox, setSelectBox] = React.useState<{
    angle: number;
    open: boolean;
  }>({
    angle: 0,
    open: false,
  });

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setSelectBox({ angle: selectBox.angle ? 0 : 180, open: !selectBox.open });
  };

  const handleClose = (e: React.MouseEvent<EventTarget>): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(e.target as HTMLElement)
    ) {
      return;
    }

    setSelectBox({ angle: 0, open: false });
  };

  return (
    <Grid position="relative" height="48px" margin="0 0 15px" z="9">
      <Grid width="132px" position="absolute" top="0" left="0">
        <Button
          width="100%"
          radius="10px"
          ref={anchorRef}
          _onClick={handleToggle}
          color="black"
          bgColor="white"
          padding="12px"
          shadow={selectBox.open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
          border={selectBox.open ? 'none' : '0.5px solid #E7E7E7'}
          addstyle={flexBox('space-between', 'center', 'inline-flex')}
        >
          <Strong fw="regular">{ageState.state}</Strong>

          <Span addstyle={SetArrowAngle(selectBox.angle)}>
            <Image width="10px" src={Arrow} alt="arrow" />
          </Span>
        </Button>

        {selectBox.open && (
          <ClickAwayListener onClickAway={handleClose}>
            <Ul
              overflow="hidden"
              padding="24px 0 0"
              margin="-24px 0 0"
              bgColor="white"
              radius="0 0 10px 10px"
              shadow={selectBox.open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
            >
              {ageOptions.map((content: string) => (
                <List
                  isFlex
                  ver="center"
                  height="32px"
                  padding=" 0 12px"
                  fs="sm"
                  bgColor={ageState.state === content ? 'skyblue' : null}
                  key={(Date.now() + Math.random()).toString(36)}
                  _onClick={(e: React.MouseEvent) => {
                    handleClose(e);
                    ageState.setState(content);
                  }}
                >
                  {content}
                </List>
              ))}
            </Ul>
          </ClickAwayListener>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectBox;
