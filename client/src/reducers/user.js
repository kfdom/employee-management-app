import {
  USER_LOADED,
  USER_LOAD_ERROR,
  DISPLAY_ADD_USER,
  DISPLAY_EDIT_USER,
  DISPLAY_VIEW_USER,
  DISPLAY_EMPTY_USER,
  ROLE_LOADED,
  TEAM_LOADED
} from '../actions/types';

const initialState = {
  loading: true,
  userList: [],
  selectedUser: null,
  currentView: 'View'
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        userList: payload
      };
    case USER_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        userList: []
      };
    case DISPLAY_ADD_USER:
      return {
        ...state,
        currentView: 'Add'
      };
    case DISPLAY_EDIT_USER:
      return {
        ...state,
        currentView: 'Edit',
        selectedUser: payload
      };
    case DISPLAY_VIEW_USER:
      return {
        ...state,
        currentView: 'View',
        selectedUser: payload
      };
    case DISPLAY_EMPTY_USER:
      return {
        ...state,
        currentView: 'Empty',
        selectedUser: null
      };
    case ROLE_LOADED:
      return {
        ...state,
        roleList: payload
      };
    case TEAM_LOADED:
      return {
        ...state,
        teamList: payload
      };
    default:
      return state;
  }
}
