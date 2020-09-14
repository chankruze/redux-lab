/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 13 2020 18:17:31 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
const redux = require('redux')
const reduxLogger = require('redux-logger')

// const createStore = redux.createStore
// const combineReducers = redux.combineReducers
// const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// action creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Purchased a cake'
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Purchased an icecream'
    }
}

// (previousState, action) => newState

// const initialState = {
//     numberOfCakes: 10,
//     numberOfIcecreams: 20
// }

const initialCakeState = {
    numberOfCakes: 10
}
const initialIcecreamState = {
    numberOfIcecreams: 20
}
// commented to demonstrate multiple reducers
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numberOfCakes: state.numberOfCakes - 1
//             }
//         case BUY_ICECREAM:
//             return {
//                 ...state,
//                 numberOfIcecreams: state.numberOfIcecreams - 1
//             }

//             default:
//                 return state
//     }
// }

const reducerCake = (state = initialCakeState, action) => {
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

const reducerIcecream = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - 1
            }

        default:
            return state
    }
}

// combine reducers
const rootReducer = redux.combineReducers({
    cake: reducerCake,
    icecream: reducerIcecream
})

// 1: holds application state
// const store = redux.createStore(reducer)
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger))
// 2: allows access to state via getState()
console.log('Initial state', store.getState())
// 4: registers listener via subscriber(listener)
const unsubscribe = store.subscribe(() => {})
// 3: allows state to be updated vua dispatch(action)
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
// 5: unsubscribe listener
unsubscribe()