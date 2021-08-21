import React from 'react';
// apis
import apis from 'src/shared/api';
// elements
import { Button, Span, Strong } from '../../../elements';
// style
import { FloatButton, ToggleLabelStyle, ToggleNameStyle } from './style';

interface Props {
  active: boolean;
}

const GuideToggle: React.FC<Props> = ({ active }): React.ReactElement => {
  const [checked, setChecked] = React.useState(active);

  const handleToggle = () => {
    setChecked((state) => !state);
    apis.GuideToggle().catch((err) => console.log(err));
  };

  React.useEffect(() => {
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
      addstyle={FloatButton}
    >
      <Span
        width="30px"
        height="30px"
        radius="50%"
        bgColor="white"
        shadow="2px 0px 3px rgba(136, 82, 0, 0.25)"
        addstyle={ToggleLabelStyle(checked)}
      />
      <Strong
        fw="semibold"
        fs="sm"
        color="white"
        addstyle={ToggleNameStyle(checked)}
      >
        {checked ? 'ON' : 'OFF'}
      </Strong>
    </Button>
  );
};

export default GuideToggle;
