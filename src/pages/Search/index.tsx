import React from 'react';

import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useTypedSelector } from 'src/redux/configureStore';
import { SearchCreators } from 'src/redux/modules/SearchModule/search';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// components
import SearchBar from '../../components/SearchBar';
import AreaSelectBox from '../../components/AreaSelectBox';
import SearchCard from '../../components/SearchCard';
import ToastMessage from '../../components/ToastMessage';
// style
import { Button, Grid, Text, Strong, Container, Image } from '../../elements';
import { CategoryBtn, NotFoundImage } from './style';

export interface SearchData {
  keyword?: string | string[];
  region: string;
  city: string;
  traveler: number;
  guide: number;
  pageNum?: number;
}

const Search = () => {
  const dispatch = useDispatch();

  const { userlist, nextItem, message }: any = useTypedSelector((state) => ({
    userlist: state.search.list,
    nextItem: state.search.nextItem,
    message: state.toastMessage.Message,
  }));
  // pageNum
  const [page, setPage] = React.useState<number>(1);
  const [ref, inView] = useInView();

  // 지역,여행자,길잡이 state
  const [category, setCategory] = React.useState<number>(0);
  const [traveler, setTraveler] = React.useState<boolean>(false);
  const [guide, setGuide] = React.useState<boolean>(false);
  const [subText, setSubText] = React.useState<string>('회원목록');
  // 도시,구 state
  const [city, setCity] = React.useState<string>('');
  const [gu, setGu] = React.useState<string>('');

  // 검색한 username state
  const [finduser, setFindUser] = React.useState<string>('');

  // 검색한 도시,구 state
  const [cityName, setCityName] = React.useState<string>('');
  const [guName, setGuName] = React.useState<string>('');

  // 페이지 첫 진입시 or 메인에서 검색후 페이지 진입시 사용할 데이터
  const SendSearch: SearchData = {
    keyword: finduser,
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
  };

  const MoreSearch: SearchData = {
    ...SendSearch,
    pageNum: page,
  };

  function AllCategory() {
    setCategory(0);
    setTraveler(false);
    setGuide(false);
  }

  function Travelerhandler() {
    setCategory(1);
    setTraveler(true);
    setGuide(false);
  }

  function Guidehandler() {
    setCategory(2);
    setGuide(true);
    setTraveler(false);
  }

  function SearchHandler() {
    setCityName(city);
    setGuName(gu);
    setPage(1);
    dispatch(SearchCreators.fetchSearchSend(SendSearch));
    if (category === 1) {
      if (gu === '' && city !== '') {
        setSubText('여행자목록');
        return;
      }
      setSubText('여행자목록');
    } else if (category === 2) {
      if (gu === '' && city !== '') {
        setSubText('길잡이목록');
        return;
      }
      setSubText('길잡이목록');
    } else {
      setSubText('회원목록');
    }
  }

  // 무한스크롤 함수
  const NextItems = React.useCallback(async () => {
    if (page > 1 && userlist && userlist.length > 9) {
      await dispatch(SearchCreators.fetchMoreSearch(MoreSearch));
    }
  }, [page]);

  React.useEffect(() => {
    NextItems();
  }, [NextItems]);

  React.useEffect(() => {
    if (inView && nextItem) {
      setPage((state) => state + 1);
    }
  }, [inView]);

  React.useEffect(() => {
    setPage(1);
    dispatch(SearchCreators.fetchSearchSend(SendSearch));
    dispatch(fetchMessage({ Message: false }));
  }, []);

  return (
    <Container>
      <SearchBar
        margin="0"
        setFindUser={setFindUser}
        EnterEvent={SearchHandler}
      />
      <Grid width="100%" margin="16px 0" isFlex hoz="flex-start">
        <Grid width="auto">
          <CategoryBtn
            radius="20px"
            width="66px"
            height="32px"
            color={category === 0 ? 'brandColor' : 'gray'}
            bgColor={
              category === 0 ? 'rgba(255,153,0,0.2)' : 'rgba(231,231,231,0.5)'
            }
            border={category === 0 ? '1px solid #ff9900' : '1px solid #c4c4c4'}
            onClick={AllCategory}
            fw="bold"
          >
            모두
          </CategoryBtn>
        </Grid>
        <Grid width="auto">
          <CategoryBtn
            radius="20px"
            color={category === 1 ? 'brandColor' : 'gray'}
            bgColor={
              category === 1 ? 'rgba(255,153,0,0.2)' : 'rgba(231,231,231,0.5)'
            }
            border={category === 1 ? '1px solid #ff9900' : '1px solid #c4c4c4'}
            width="80px"
            height="32px"
            margin="0 0 0 10px"
            onClick={Travelerhandler}
            fw="bold"
          >
            여행자
          </CategoryBtn>
          <CategoryBtn
            radius="20px"
            color={category === 2 ? 'brandColor' : 'gray'}
            bgColor={
              category === 2 ? 'rgba(255,153,0,0.2)' : 'rgba(231,231,231,0.5)'
            }
            border={category === 2 ? '1px solid #ff9900' : '1px solid #c4c4c4'}
            width="80px"
            height="32px"
            onClick={Guidehandler}
            margin="0 0 0 10px"
            fw="bold"
          >
            길잡이
          </CategoryBtn>
        </Grid>
      </Grid>
      <AreaSelectBox setGu={setGu} setCity={setCity} />
      <Button _onClick={SearchHandler} fw="bold" width="100%" height="54px">
        검색
      </Button>
      {userlist.length > 0 ? (
        <Text margin="28px 0 12px 0">
          <Strong>{cityName ? `${cityName}` : ''}</Strong>
          <Strong> {guName ? `${guName}` : '전체'}</Strong>
          <Strong fw="md"> {subText}입니다.</Strong>
        </Text>
      ) : null}
      {userlist
        ? userlist.map((item, idx) => {
            return <SearchCard userInfo={item} key={idx} idx={idx} />;
          })
        : ''}
      {userlist.length < 1 ? (
        <>
          <Image
            src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/searchnofound.png"
            addstyle={NotFoundImage}
          />
          <Text textAlign="center">검색된 회원이 없습니다.</Text>
        </>
      ) : null}
      <div ref={ref} style={{ marginTop: '100px', height: '20px' }} />
      {message && <ToastMessage msg="관심목록에 추가되었습니다" />}
    </Container>
  );
};

export default Search;
