import React, { useState } from 'react';
// elements
import { Button } from '../../../elements';
// style
import { ButtonStyle, ToggleLabelStyle, ToggleNameStyle } from './style';

const GuideToggle = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(state => !state);
  };

  return (
    <Button
      padding="3px"
      width="76px"
      radius="30px"
      shadow="inset 2px 2px 3px rgba(136, 82, 0, 0.25)"
      bgColor={checked ? 'brandColor' : 'gray'}
      _onClick={handleToggle}
      addStyle={ButtonStyle}
    >
      <ToggleLabelStyle checked={checked} />
      <ToggleNameStyle checked={checked}>
        {checked ? 'ON' : 'OFF'}
      </ToggleNameStyle>
    </Button>
  );
};

GuideToggle.propTypes = {};

export default GuideToggle;
