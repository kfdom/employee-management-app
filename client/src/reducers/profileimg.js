import { PROFILEIMG_LOADED, PROFILEIMG_LOAD_ERROR } from '../actions/types';

const initialState = {
  profileImgList: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILEIMG_LOADED:
      return {
        ...state,
        profileImgList: payload
      };
    case PROFILEIMG_LOAD_ERROR:
      return {
        ...state,
        profileImgList: []
      };

    default:
      return state;
  }
}
