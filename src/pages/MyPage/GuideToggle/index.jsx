import React, { useEffect, useState } from 'react';
// elements
import { Button } from '../../../elements';
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
      padding="3px"
      width="76px"
      radius="30px"
      shadow="inset 2px 2px 3px rgba(136, 82, 0, 0.25)"
      bgColor={checked ? 'brandColor' : 'gray'}
      _onClick={handleToggle}
      addstyle={ButtonStyle}
    >
      <ToggleLabelStyle checked={checked} />
      <ToggleNameStyle checked={checked}>
        {checked ? 'ON' : 'OFF'}
      </ToggleNameStyle>
    </Button>
  );
};

export default GuideToggle;
