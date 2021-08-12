import React, { useEffect, useState } from 'react';
// elements
import { Button, Span, Strong } from '../../../elements';
// style
import { ButtonStyle, ToggleLabelStyle, ToggleNameStyle } from './style';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';

const GuideToggle = ({ active }) => {
  const [checked, setChecked] = useState(active);

  const handleToggle = () => {
    setChecked(state => !state);
    MypageCreators.ToggleGuideDB();
  };

  useEffect(() => {
    setChecked(active);
  }, [active]);

  return (
    <Button
      isFlex
      ver="center"
      padding="3px"
      width="76px"
      radius="30px"
      shadow="inset 2px 2px 3px rgba(136, 82, 0, 0.25)"
      bgColor={checked ? 'brandColor' : 'gray'}
      _onClick={handleToggle}
      addstyle={ButtonStyle}
    >
      <Span
        display="inline-block"
        width="30px"
        height="30px"
        radius="50%"
        bgColor="white"
        shadow="2px 0px 3px rgba(136, 82, 0, 0.25)"
        checked={checked}
        addstyle={ToggleLabelStyle}
      />
      <Strong
        fw="semibold"
        size="xs"
        color="white"
        checked={checked}
        addstyle={ToggleNameStyle}
      >
        {checked ? 'ON' : 'OFF'}
      </Strong>
    </Button>
  );
};

export default GuideToggle;
