import React from 'react';
import LinkStyle from './style';

const Link = ({ children, href, ...props }) => {
  return (
    <LinkStyle to={href} {...props}>
      {children}
    </LinkStyle>
  );
};

Link.defaultProps = {
  color: 'black',
};

export default Link;
