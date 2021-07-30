import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SET_PROFILE_PREVIEW = 'image/SET_PROFILE_PREVIEW';

const setProfilePre = createAction(SET_PROFILE_PREVIEW, preview => ({
  preview,
}));

const initialState = {
  uploaded: true,
  profilePre: null,
};

// const ArticleLoadDB = () => {
//   return function (dispatch) {
//     dispatch(ArticleLoad);
//   };
// };

export default handleActions(
  {
    [SET_PROFILE_PREVIEW]: (state, action) =>
      produce(state, draft => {
        draft.profilePre = action.payload.preview;
      }),
  },
  initialState,
);

const ImageCreators = {
  setProfilePre,
};

export { ImageCreators };
