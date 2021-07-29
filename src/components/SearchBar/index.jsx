import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Input } from '../../elements/index';

const SearchBar = () => {
  return (
    <Grid margin="28px 0 0 0" position="relative">
      <Input placeholder="가이디/트리비를 검색하세요." />
      <Grid
        width="30px"
        height="30px"
        position="absolute"
        right="10px"
        top="14px"
        color="gray"
      >
        <SearchIcon />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
