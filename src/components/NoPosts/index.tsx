import React from 'react';
// style
import { limitWidth } from 'src/styles/Mixin';
// history
import { history } from '../../redux/configureStore';
// elements
import { Grid, Button, Text, MainTitle, Image } from '../../elements';
// image
import cloudIcon from '../../Images/cloud_icon.svg';

export interface Props {
  list: any[];
  title: string;
  coment: string;
  link: string;
  margin?: string;
  children: React.ReactElement | React.ReactElement[];
}

const NoPosts = ({ list, title, coment, link, margin, children }: Props) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid
      color="darkGray"
      bgColor="white"
      radius="14px"
      padding="20px"
      isFlex
      ver="center"
      cursor="pointer"
      margin={margin}
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

      <Grid addstyle={limitWidth}>
        <MainTitle fs="lg" color="black" margin="0 0 6px">
          {title}
        </MainTitle>

        <Text wb="keep-all" fs="sm">
          {coment}
        </Text>
      </Grid>
    </Grid>
  );
};

export default NoPosts;
