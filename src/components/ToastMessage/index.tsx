import React from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'src/elements';
import { useTypedSelector } from 'src/redux/configureStore';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import ToastMessageStyle from './style';

interface Props {
  msg: string;
}

const ToastMessage = ({ msg }: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const message = useTypedSelector((state) => state.toastMessage.Message);
  const error = useTypedSelector((state) => state.toastMessage.error);

  function setTimeMessage() {
    if (message) {
      setTimeout(() => {
        dispatch(fetchMessage({ Message: false, error: '' }));
      }, 2000);
    }
  }

  React.useEffect(() => {
    setTimeMessage();
  }, [message, error]);

  return (
    <>
      {message ? (
        <ToastMessageStyle>
          <Text fw="bold">{error ? `${error}` : `${msg}`}</Text>
        </ToastMessageStyle>
      ) : null}
    </>
  );
};

export default ToastMessage;
