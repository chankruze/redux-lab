/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 14 2020 20:57:36 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
// const reduxLogger = require('redux-logger')

// const logger = reduxLogger.createLogger()

// state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (data) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

const fetchUsersFailure = (err) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: err
    }
}

// action creator (returns function + action object)
// thunk middleware make action creator return a function for performing side effects
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                // const users = res.data.map(user => user.id)
                const users = res.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err => {
                dispatch(fetchUsersFailure(err.message))
            })
    }
}

const reducer = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }

        default:
            return state
    }
}

// create store
// const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware, logger))
const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())
// unsubscribe()