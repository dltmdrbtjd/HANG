import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:d02afe22-f859-40bb-aedb-0c5dead2f8d1',
  }),
});

const SET_PROFILE_PREVIEW = 'image/SET_PROFILE_PREVIEW';
const UPLOAD_PROFILE_IMAGE = 'image/UPLOAD_PROFILE_IMAGE';

const setProfilePre = createAction(SET_PROFILE_PREVIEW, preview => ({
  preview,
}));
const uploadProfileImg = createAction(UPLOAD_PROFILE_IMAGE, imgUrl => ({
  imgUrl,
}));

const initialState = {
  uploaded: true,
  profilePre: null,
  profileImg: null,
};

const uploadProfileImgDB = (image, callBack) => {
  return dispatch => {
    // dispatch(uploaded(true));

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'hang-image-upload/profile',
        Key: image.name,
        Body: image,
      },
    });

    const promise = upload.promise();

    promise
      .then(() => {
        dispatch(
          uploadProfileImg(
            `https://dpcgepgmqx2vj.cloudfront.net/profile/${image.name}?w=100&h=100`,
          ),
        );
        // dispatch(uploading(false));
      })
      .then(() => {
        callBack();
      })
      .catch(error => {
        console.error(error);
        // dispatch(uploading(false));
        return alert('오류가 발생했습니다: ', error.message);
      });
  };
};

export default handleActions(
  {
    [SET_PROFILE_PREVIEW]: (state, action) =>
      produce(state, draft => {
        draft.profilePre = action.payload.preview;
      }),

    [UPLOAD_PROFILE_IMAGE]: (state, action) =>
      produce(state, draft => {
        draft.profileImg = action.payload.imgUrl;
      }),
  },
  initialState,
);

const ImageCreators = {
  setProfilePre,
  uploadProfileImg,
  uploadProfileImgDB,
};

export { ImageCreators };
