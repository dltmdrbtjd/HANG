import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// elements
import {
  Button,
  Strong,
  Image,
  Grid,
  Ul,
  List,
  Span,
} from '../../elements/index';
// image
import Arrow from '../../Images/arrow.png';
// style
import ArrowRotate from './style';

const SelectBox = ({ initailOption, contents, setState }) => {
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
          form="text"
          width="100%"
          radius="0"
          ref={anchorRef}
          _onClick={handleToggle}
          color="black"
        >
          <Span
            width="100%"
            isFlex
            bgColor="white"
            hoz="space-between"
            ver="center"
            radius="10px"
            padding="14px 12px"
            angle={angle}
            shadow={open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
            border={open || '0.5px solid #E7E7E7'}
            addstyle={ArrowRotate}
          >
            <Strong fw="regular">{option}</Strong>
            <Image width="10px" src={Arrow} alt="arrow" />
          </Span>
        </Button>

        {open && (
          <ClickAwayListener onClickAway={handleClose}>
            <Ul
              padding="24px 0 0"
              margin="-24px 0 0"
              bgColor="white"
              radius="0 0 10px 10px"
              shadow={open && '0px 2px 3px rgba(136, 136, 136, 0.25)'}
            >
              {contents.map(content => (
                <List
                  isFlex
                  ver="center"
                  height="32px"
                  padding=" 0 12px"
                  fs="sm"
                  bgColor={option === content ? 'skyblue' : null}
                  key={(Date.now() + Math.random()).toString(36)}
                  onClick={event => {
                    setOption(content);
                    handleClose(event);
                    setState(content);
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
