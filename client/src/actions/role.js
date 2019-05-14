import axios from 'axios';

import { ROLE_LOADED, ROLE_LOAD_ERROR } from './types';

// Load all roles
export const loadRole = () => async dispatch => {
  try {
    const res = await axios.get('/api/roles');
    dispatch({
      type: ROLE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROLE_LOAD_ERROR
    });
  }
};
