import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// elements
import { Button, Ul, List } from '../../elements';

const DropDown = ({ icon, contents, methods, top }) => {
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

  return (
    <>
      <Button form="text" padding="0" ref={anchorRef} _onClick={handleToggle}>
        {icon}
      </Button>

      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <Ul
            width="auto"
            bgColor="white"
            border="1px solid #E7E7E7"
            position="absolute"
            top={top}
            right="0"
            z="9"
            shadow="0px 2px 3px rgba(196, 196, 196, 0.25)"
          >
            {contents.map((content, idx) => {
              const isLast = idx === contents.length - 1;

              return (
                <List
                  key={(idx * Date.now() + Math.random()).toString(36)}
                  padding="16px 30px"
                  border={isLast || '1px solid #E7E7E7'}
                  borDirection={isLast || 'bottom'}
                  _onClick={methods ? () => methods[idx]() : null}
                >
                  {content}
                </List>
              );
            })}
          </Ul>
        </ClickAwayListener>
      ) : null}
    </>
  );
};

DropDown.propTypes = {};

export default DropDown;
