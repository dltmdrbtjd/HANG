import React from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'src/elements';
import { useTypedSelector } from 'src/redux/configureStore';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import ToastMessageStyle from './style';

const ToastMessage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const message = useTypedSelector((state) => state.toastMessage.Message);
  const text = useTypedSelector((state) => state.toastMessage.text);

  function setTimeMessage() {
    if (message) {
      setTimeout(() => {
        dispatch(fetchMessage({ Message: false, text: '' }));
      }, 2000);
    }
  }

  React.useEffect(() => {
    setTimeMessage();
  }, [message, text]);

  return (
    <>
      {message ? (
        <ToastMessageStyle>
          <Text fw="bold">{text}</Text>
        </ToastMessageStyle>
      ) : null}
    </>
  );
};

export default ToastMessage;
