import React from 'react';
// elements
import { Span } from 'src/elements';
// type
import { Props } from 'src/elements/Span';

interface TagType extends Props {
  list: string[];
  bgColor?: string;
  padding?: string;
  fs?: string;
}

const Tag = ({ list, padding, fs, bgColor, ...props }: TagType) => {
  return (
    <>
      {list.length
        ? list.map((content: string) => (
            <Span
              border="0.5px solid #E7E7E7"
              bgColor={bgColor}
              color="darkGray"
              padding={padding}
              radius="40px"
              margin="0 8px 0 0"
              fs={fs}
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
};

export default Tag;
