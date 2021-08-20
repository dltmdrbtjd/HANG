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

  return <></>;
};

export default Dropdown;
