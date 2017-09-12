import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import reducer from '../app/appReducer';

export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise),
        window.devToolExtention ? window.devToolExtention() : f => f
    )(createStore);

    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        module.hot.accept('../app/appReducer', () => {
            const nextReducer = require('../app/appReducer');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}