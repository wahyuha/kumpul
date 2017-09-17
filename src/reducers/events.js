export default function reducer(state={
    loadmore: true
}, action) {
    switch (action.type) {
        case "LOADMORE_ON": {
            return {...state, loadmore: true}
        }
        case "LOADMORE_OFF": {
            return {...state, loadmore: false}
        }
        case "LOADMORE_STATUS": {
            return {...state}
        }
    }

    return state
}

