import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';//allows us to access the states from anywhere
import { legacy_createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import './index.css';

import App from './App';
//to set redux we first setup the store
const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}> {/*Provider Helps the wrapped element inside access the redux store*/}
       <App />
    </Provider>,document.getElementById('root') 
);