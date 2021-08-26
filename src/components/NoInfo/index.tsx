import React from 'react';
import { floatBox, limitWidth } from 'src/styles/Mixin';
// elements
import { Text, Image, Grid } from '../../elements';

export interface Props {
  list: any[];
  contents: string;
  imageUrl?: string;
  staticBox?: boolean;
  margin?: string;
}

const NoInfo: React.FC<Props> = ({
  list,
  contents,
  imageUrl,
  staticBox,
  margin,
  children,
}) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid
      isFlex
      column
      hoz="center"
      ver="center"
      margin={margin}
      addstyle={
        !staticBox ? floatBox('absolute', '0', '0', '0', '0', '-1') : null
      }
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
  margin: 'auto',
};

export default NoInfo;
