import { TEAM_LOADED, TEAM_LOAD_ERROR } from '../actions/types';

const initialState = {
  teamList: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TEAM_LOADED:
      return {
        ...state,
        teamList: payload
      };
    case TEAM_LOAD_ERROR:
      return {
        ...state,
        teamList: []
      };

    default:
      return state;
  }
}
