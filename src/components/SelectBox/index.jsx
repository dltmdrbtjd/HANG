import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// style
import ListWrapper, { SpanStyle } from './style';
// elements
import { Button, Strong, Image, Grid } from '../../elements/index';
// image
import Arrow from '../../Images/arrow.png';

const SelectBox = ({ initailOption, contents, ...props }) => {
  const [option, setOption] = useState(initailOption);
  const [angle, setAngle] = useState(180);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
    setAngle(angle ? 0 : 180);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setAngle(180);
  };

  return (
    <Grid width="132px">
      <Button
        width="100%"
        bgColor="bgColor"
        radius="0"
        padding="0"
        ref={anchorRef}
        _onClick={handleToggle}
        color="black"
        shadow="none"
      >
        <SpanStyle angle={angle}>
          <Strong fw="regular">{option}</Strong>
          <Image width="10px" src={Arrow} alt="arrow" />
        </SpanStyle>
      </Button>

      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <ListWrapper {...props}>
            {contents.map(content => (
              <li
                key={(Date.now() + Math.random()).toString(36)}
                onClick={event => {
                  setOption(content);
                  handleClose(event);
                }}
              >
                {content}
              </li>
            ))}
          </ListWrapper>
        </ClickAwayListener>
      )}
    </Grid>
  );
};

SelectBox.defaultProps = {};

export default SelectBox;