export default function reducer(state={
    user: {},
    users: [],
    fetching: false,
    fetched: false,
    page: {},
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_USERS": {
            return {...state, fetching: true}
        }
        case "FETCH_USERS_FAILED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_USERS_SUCCESS": {
            // ambil dari store sebelumnya (tidak call ajax lagi)
            if(state.users.length>0) {
                return {
                    ...state, 
                    fetching: false, 
                    fetched: true
                }
            }

            return {
                ...state, 
                fetching: false, 
                fetched: true,
                users: action.payload
            }
        }
        case "GET_USER" : {
            return {...state, user: Object.assign([], state.users).find(value => value.id == action.payload)}
        }
        case "DELETE_USER": {
            return {
                ...state,
                users: state.users.filter(value => value.id != action.payload)
            }
        }
        case "ADD_OR_EDIT_USER": {
            var edit = false
            state.users.map((value, index)=> {
                if(value.id==action.payload.id) {
                    state.users[index]=action.payload
                    edit = true
                }
            })
            if(!edit) {
                // buat userid baru, max+1
                let ids = []
                state.users.map(value=> ids.push(value.id))
                let newId = Math.max.apply(null, ids)+1

                let newUser = {...action.payload, id: newId}
                state.users.push(newUser)
            }

            const perpage = 5
            const numOfUser = state.users.length

            var pages = Math.ceil(numOfUser/perpage)

            return {
                ...state, 
                users: [...state.users]
            }
        }
    }

    return state
}