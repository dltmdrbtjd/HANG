import React from 'react';
// elements
import { Span } from 'src/elements';
// type
import { Props } from 'src/elements/Span';
import { setMediaFontSize } from 'src/styles/Media';

interface TagType extends Props {
  list: string[];
  bgColor?: string;
  padding?: string;
  fs?: string;
  tabFont?: string;
  active?: boolean;
}

const Tag: React.FC<TagType> = ({
  list,
  padding,
  fs,
  bgColor,
  tabFont,
  active,
  children,
  ...props
}) => {
  return (
    <>
      {list.length ? (
        <Span
          border="0.5px solid #E7E7E7"
          bgColor={active ? 'brandColor' : bgColor}
          color={active ? 'white' : 'darkGray'}
          padding={padding}
          radius="40px"
          margin="0 8px 8px 0"
          fs={fs}
          addstyle={setMediaFontSize(tabFont)}
          {...props}
        >
          #{children}
        </Span>
      ) : null}
    </>
  );
};

Tag.defaultProps = {
  bgColor: 'bgColor',
  padding: '5px 12px',
  fs: 'status',
  tabFont: 'status',
};

export default Tag;
