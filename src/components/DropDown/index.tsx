import React from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// style
import { outlineBox } from 'src/styles/Mixin';
// elements
import { Button, Ul, List } from '../../elements';

export interface Props {
  icon: React.ReactElement;
  contents: string[];
  methods: any[];
  top: string;
}

const Dropdown = ({ icon, contents, methods, top }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e: React.MouseEvent<EventTarget>): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(e.target as HTMLElement)
    ) {
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
                  textAlign="center"
                  padding="16px 30px"
                  _onClick={() => methods[idx]()}
                  addstyle={isLast || outlineBox('1px solid #E7E7E7', 'bottom')}
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

export default Dropdown;
