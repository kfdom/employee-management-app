import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import role from './role';
import team from './team';

export default combineReducers({
  alert,
  user,
  role,
  team
});
