import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOADED,
  USER_LOAD_ERROR,
  DISPLAY_ADD_USER,
  DISPLAY_EDIT_USER,
  DISPLAY_VIEW_USER
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_LOAD_ERROR
    });
  }
};

// Load View
export const loadView = (type, user) => async dispatch => {
  if (type === 'Add') {
    dispatch({
      type: DISPLAY_ADD_USER
    });
  } else if (type === 'View') {
    const res = await axios.get(`/api/users/${user}`);

    dispatch({
      type: DISPLAY_VIEW_USER,
      payload: res.data
    });
  } else if (type === 'Edit') {
    const res = await axios.get(`/api/users/${user}`);

    dispatch({
      type: DISPLAY_EDIT_USER,
      payload: res.data
    });
  }
};

// Add User
export const addUser = ({ name, email, role, team, address, ...props }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('!!!!!!!!SUBMIT!!', name, email, role, team, address);

  const body = JSON.stringify({ name, email, role, team, address });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch(loadView('View', res.data));
    dispatch(setAlert('Employee successfully created', 'success'));
    dispatch(loadUser());
  } catch (err) {
    console.log('ERROR', err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(loadUser());
  }
};
