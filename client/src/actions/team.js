import axios from 'axios';

import { TEAM_LOADED, TEAM_LOAD_ERROR } from './types';

// Load all teams
export const loadTeam = () => async dispatch => {
  try {
    const res = await axios.get('/api/teams');
    dispatch({
      type: TEAM_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TEAM_LOAD_ERROR
    });
  }
};
