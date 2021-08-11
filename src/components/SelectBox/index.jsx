import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// style
import ListWrapper, { SpanStyle, ListStyle } from './style';
// elements
import { Button, Strong, Image, Grid } from '../../elements/index';
// image
import Arrow from '../../Images/arrow.png';

const SelectBox = ({ initailOption, contents, setState, ...props }) => {
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
    <Grid position="relative" height="48px" margin="0 0 15px" z="9">
      <Grid width="132px" position="absolute" top="0" left="0">
        <Button
          width="100%"
          bgColor="bgColor"
          radius="0"
          padding="0"
          ref={anchorRef}
          _onClick={handleToggle}
          color="black"
        >
          <SpanStyle
            angle={angle}
            shadow={open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
            border={open || '0.5px solid #E7E7E7'}
          >
            <Strong fw="regular">{option}</Strong>
            <Image width="10px" src={Arrow} alt="arrow" />
          </SpanStyle>
        </Button>

        {open && (
          <ClickAwayListener onClickAway={handleClose}>
            <ListWrapper
              {...props}
              shadow={open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
            >
              {contents.map(content => (
                <ListStyle
                  bgColor={option === content ? 'skyblue' : null}
                  key={(Date.now() + Math.random()).toString(36)}
                  onClick={event => {
                    setOption(content);
                    handleClose(event);
                    setState(content);
                  }}
                >
                  {content}
                </ListStyle>
              ))}
            </ListWrapper>
          </ClickAwayListener>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectBox;
