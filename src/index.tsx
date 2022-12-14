import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";


/*let rerenderEntireTree = (state: RootStateType) => {*/
ReactDOM.render(
    //Provider пока можно не понимать
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
/*
};
rerenderEntireTree(store.getState());
*/

/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})*/ //для архива

