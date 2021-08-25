import React from 'react';
// apis
import apis from 'src/shared/api';
// redux
import { SetGuideToggle } from 'src/redux/modules/MyPageModule/mypage';
import { useDispatch } from 'react-redux';
// elements
import { Button, Span, Strong } from '../../../elements';
// style
import { FloatButton, ToggleLabelStyle, ToggleNameStyle } from './style';

interface Props {
  active: number;
}

const GuideToggle: React.FC<Props> = ({ active }): React.ReactElement => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    apis
      .GuideToggle()
      .then(() => dispatch(SetGuideToggle(Number(!active))))
      .catch((err) => console.log(err));
  };

  return (
    <Button
      padding="3px"
      width="76px"
      radius="30px"
      shadow="inset 2px 2px 3px rgba(136, 82, 0, 0.25)"
      bgColor={active ? 'brandColor' : 'gray'}
      _onClick={handleToggle}
      addstyle={FloatButton}
    >
      <Span
        width="30px"
        height="30px"
        radius="50%"
        bgColor="white"
        shadow="2px 0px 3px rgba(136, 82, 0, 0.25)"
        addstyle={ToggleLabelStyle(active)}
      />
      <Strong
        fw="semibold"
        fs="sm"
        color="white"
        addstyle={ToggleNameStyle(active)}
      >
        {active ? 'ON' : 'OFF'}
      </Strong>
    </Button>
  );
};

export default GuideToggle;
