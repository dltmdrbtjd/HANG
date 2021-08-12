import React from 'react';
// history
import { history } from '../../redux/configureStore';
// elements
import { Grid, Button, Text, MainTitle, Image } from '../../elements';
// style
import TabFontSize from './style';
// image
import cloudIcon from '../../Images/cloud_icon.svg';

const NoPosts = ({ list, title, coment, link, children, ...props }) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid
      color="darkG"
      bgColor="white"
      radius="14px"
      padding="20px"
      isFlex
      ver="center"
      {...props}
      _onClick={() => history.push(link)}
    >
      <Button
        form="text"
        width="50px"
        height="50px"
        radius="50%"
        _onClick={() => history.push(link)}
        margin="0 12px 0 0"
      >
        <Image src={cloudIcon} alt="cloud" />
      </Button>

      <Grid addstyle="flex: 1">
        <MainTitle
          fs="lg"
          color="black"
          margin="0 0 6px"
          tab={TabFontSize('la')}
        >
          {title}
        </MainTitle>

        <Text wb="keep-all" fs="sm" tab={TabFontSize('lg')}>
          {coment}
        </Text>
      </Grid>
    </Grid>
  );
};

export default NoPosts;
