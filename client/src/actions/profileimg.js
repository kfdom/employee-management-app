import axios from 'axios';

import { PROFILEIMG_LOADED, PROFILEIMG_LOAD_ERROR } from './types';

// Load all profile images
export const loadProfileImg = () => async dispatch => {
  try {
    const res = await axios.get('/api/profileimages');
    dispatch({
      type: PROFILEIMG_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILEIMG_LOAD_ERROR
    });
  }
};
