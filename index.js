/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 13 2020 18:17:31 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const BUY_CAKE = 'BUY_CAKE'


// Action creator
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