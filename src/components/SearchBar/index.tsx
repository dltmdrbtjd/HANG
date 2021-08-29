import React from 'react';
// lodash
import _ from 'lodash';
// router
import { useLocation } from 'react-router';
// style
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Input } from 'src/elements';

export interface Props {
  margin?: string;
  callback?: () => void;
  EnterEvent?: any;
  setFindUser?: any;
}

const SearchBar = ({ callback, margin, EnterEvent, setFindUser }: Props) => {
  const [keyword, SetKeyWord] = React.useState<string>('');
  const path: string = useLocation().pathname;

  const InputValue = React.useCallback((e: any) => {
    SetKeyWord(e.target.value);
  }, []);

  const KeyPressHandler = (e: any) => {
    if (e.key === 'Enter') {
      EnterEvent();
    }
  };

  React.useEffect(() => {
    if (path.includes('/search')) {
      setFindUser(keyword);
    }
  }, [keyword]);

  return (
    <Grid margin={margin} position="relative" isFlex ver="center">
      <Input
        fs="smm"
        placeholder="닉네임을 검색해주세요"
        _onChange={_.debounce(InputValue, 100)}
        _onKeyPress={KeyPressHandler}
        radius="40px"
        padding="11px 45px 11px 23px"
      />
      <Grid
        width="27px"
        height="27px"
        position="absolute"
        right="13px"
        top="10px"
        color="gray"
        cursor="pointer"
        _onClick={callback}
      >
        <SearchIcon style={{ fontSize: '27px' }} />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
