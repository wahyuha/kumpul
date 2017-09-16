export default function reducer(state={
    events: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_EVENTS": {
            return {...state, fetching: true}
        }
        case "FETCH_EVENTS_FAILED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_EVENTS_SUCCESS": {
            return {
                ...state, 
                fetching: false, 
                fetched: true,
                events: action.payload
            }
        }
        case "ADD_EVENTS": {
            return {
                ...state, 
                events: [...state.events, action.payload]
            }
        }
        case "DELETE_EVENTS": {
            return {
                ...state,
                events: state.events.filter(value => value.id !==action.payload)
            }
        }

    }

    return state
}

