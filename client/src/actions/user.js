import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOADED,
  USER_LOAD_ERROR,
  DISPLAY_ADD_USER,
  DISPLAY_EDIT_USER,
  DISPLAY_VIEW_USER,
  DISPLAY_EMPTY_USER
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
export const addUpdateUser = ({
  name,
  email,
  role,
  team,
  address,
  profileImg,
  id
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, role, team, address, image: profileImg, id });

  try {
    const res = await axios.post('/api/users', body, config);

    if (id) {
      dispatch(loadView('View', id));
      dispatch(setAlert('Employee successfully updated', 'success'));
    } else {
      dispatch(loadView('View', res.data));
      dispatch(setAlert('Employee successfully created', 'success'));
    }

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(loadUser());
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`);

    dispatch({
      type: DISPLAY_EMPTY_USER
    });
    dispatch(setAlert('Employee successfully deleted', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(loadUser());
  }
};
