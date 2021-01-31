import React from 'react'
import { useReducer, useEffect } from 'react'
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_ITEMS: 'get-items',
    ERROR: 'error'
}

const endpoint = 'http://localhost:5001/api/'

function reducer (state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, items: []}
        case ACTIONS.GET_ITEMS:
            return {...state, loading: false, items: action.payload.items}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: true, items: []}
        default:
            return state
    }

}

export default function useFetchItems(params) {
    const [state, dispatch] = useReducer(reducer, {items: [], loading: true})

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(endpoint+'items/', {
            params
        }).then( res => {
            console.log('done')
            dispatch({ type: ACTIONS.GET_ITEMS, payload: { items: res.data } });
            
        }).catch( e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
    }, [])

    return state
}
