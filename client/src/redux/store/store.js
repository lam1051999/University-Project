import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {startReducer , NewsReducer , DssvReducer , DshpReducer , HpdhReducer , DssvhpReducer} from '../reducer/reducer';


const store = createStore(
    combineReducers({startReducer , NewsReducer , DssvReducer , DshpReducer , HpdhReducer , DssvhpReducer}),
    applyMiddleware(thunk)
);

export default store;