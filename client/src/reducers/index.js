import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import role from './role';
import team from './team';
import profileimg from './profileimg';

export default combineReducers({
  alert,
  user,
  role,
  team,
  profileimg
});
