import React from 'react';
import { limitWidth } from 'src/styles/Mixin';
// elements
import { Text, Image, Grid } from '../../elements';

export interface Props {
  list: any[];
  contents: string;
  imageUrl?: string;
}

const NoInfo: React.FC<Props> = ({ list, contents, imageUrl, children }) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid
      isFlex
      column
      hoz="center"
      ver="center"
      position="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      margin="auto"
    >
      <Image
        width="70%"
        src={imageUrl}
        alt="no info"
        addstyle={limitWidth('350px')}
      />
      <Text textAlign="center" margin="20px 0 0">
        {contents}
      </Text>
    </Grid>
  );
};

NoInfo.defaultProps = {
  imageUrl:
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/favoritenotfound.png',
};

export default NoInfo;
