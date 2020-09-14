/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 13 2020 18:17:31 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
const redux  = require('redux')
// const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'

// action creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// (previousState, action) => newState

const initialState = {
    numberOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }

            default:
                return state
    }
}

// 1: holds application state
// const store = redux.createStore(reducer)
const store = redux.createStore(reducer)
// 2: allows access to state via getState()
console.log('Initial state', store.getState())
// 4: registers listener via subscriber(listener)
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
// 3: allows state to be updated vua dispatch(action)
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
// 5: unsubscribe listener
unsubscribe()