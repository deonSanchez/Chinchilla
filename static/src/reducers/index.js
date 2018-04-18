import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import auth from './auth';
// import data from './data';

import { reducer as formReducer } from 'redux-form'
import PostReducer from './PostReducer'
import UserReducer from './UserReducer';
const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    posts: PostReducer,
    user: UserReducer,
    auth,
    data,
});

export default rootReducer;
