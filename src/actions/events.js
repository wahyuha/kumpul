export function loadmoreON(flag) {
    return {
        type: 'LOADMORE_ON', payload: true
    }
}

export function loadmoreOFF(flag) {
    return {
        type: 'LOADMORE_OFF', payload: false
    }
}