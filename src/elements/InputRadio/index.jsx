import React, { useState } from 'react';
// elements
import Label from '../Label';
// style
import RadioStyle from './style';
import Grid from '../Grid';

const InputRadio = ({ name, list, setState }) => {
  const [checked, setChecked] = useState(0);

  return (
    <>
      {list.map((elem, idx) => (
        <Grid
          key={(idx + Date.now() + Math.random()).toString(36)}
          isFlex
          ver="center"
        >
          <RadioStyle
            type="radio"
            id={elem.id}
            name={name}
            checked={checked === idx}
            onChange={() => {
              setChecked(idx);
              setState(idx);
            }}
          />

          {elem.text ? <Label id={elem.id}>{elem.text}</Label> : null}
        </Grid>
      ))}
    </>
  );
};

export default InputRadio;
