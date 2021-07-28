import React, { useState } from 'react';
import AreaSelectBox from '../../components/AreaSelectBox';
import SearchBar from '../../components/SearchBar';
import Modal from '../../components/Modal';
import { Button } from '../../elements/index';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const agreeModal = () => {
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AreaSelectBox />
      <SearchBar />
      <Modal open={modalOpen} agree={agreeModal} close={closeModal} />
      <Button width="100%" margin="50px 0 0 0" _onClick={openModal}>
        신청하기 TEST
      </Button>
    </>
  );
};

export default Home;
