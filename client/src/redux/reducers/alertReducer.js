import { alertConstants } from '../actions/types';

export function alertReducer(state = {}, action) {
    switch (action.type) {
        case alertConstants.State.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message,
            };
        case alertConstants.State.ERROR:
            return {
                type: 'alert-danger',
                message: action.message,
            };
        case alertConstants.State.CLEAR:
            return {
                type: 'alert-clear',
            };
        default:
            return state;
    }
}