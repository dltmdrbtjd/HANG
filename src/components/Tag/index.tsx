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
}

const Tag = ({ list, padding, fs, bgColor, tabFont, ...props }: TagType) => {
  return (
    <>
      {list.length
        ? list.map((content: string, idx: number) => (
            <Span
              key={(idx * Date.now() + Math.random()).toString(36)}
              border="0.5px solid #E7E7E7"
              bgColor={bgColor}
              color="darkGray"
              padding={padding}
              radius="40px"
              margin="0 8px 8px 0 "
              fs={fs}
              addstyle={setMediaFontSize(tabFont)}
              {...props}
            >
              #{content}
            </Span>
          ))
        : null}
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
