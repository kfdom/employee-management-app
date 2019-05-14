import { ROLE_LOADED, ROLE_LOAD_ERROR } from '../actions/types';

const initialState = {
  roleList: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROLE_LOADED:
      return {
        ...state,
        roleList: payload
      };
    case ROLE_LOAD_ERROR:
      return {
        ...state,
        roleList: []
      };

    default:
      return state;
  }
}
