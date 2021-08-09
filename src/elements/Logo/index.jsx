import React from 'react';
// history
import { history } from '../../redux/configureStore';
// components
import Button from '../Button';
// images
import LogoImg from '../../Images/Symbol.png';
// style
import LogoStyle from './style';

const Logo = ({ href, ...props }) => {
  return (
    <LogoStyle {...props}>
      {href && (
        <Button
          width="100%"
          height="100%"
          shape="text"
          _onClick={() => history.push(href)}
        >
          Hang
        </Button>
      )}
    </LogoStyle>
  );
};

Logo.defaultProps = {
  imgUrl: LogoImg,
};

export default Logo;
