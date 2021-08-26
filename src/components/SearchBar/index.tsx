import React from 'react';
// lodash
import _ from 'lodash';
// router
import { useLocation } from 'react-router';
// style
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Input } from 'src/elements';
// redux
import { history } from 'src/redux/configureStore';

const SearchBar = ({ margin, ...props }) => {
  const [keyword, SetKeyWord] = React.useState<string>('');
  const path: string = useLocation().pathname;

  const InputValue = React.useCallback((e: any) => {
    SetKeyWord(e.target.value);
  }, []);

  const KeyPressHandler = (e: any) => {
    if (e.key === 'Enter') {
      props.EnterEvent();
    }
  };

  React.useEffect(() => {
    if (path.includes('/search')) {
      props.setFindUser(keyword);
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
      >
        <SearchIcon style={{ fontSize: '27px' }} />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
