import { alertConstants } from './types';
import { toast } from 'react-toastify';

const success = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
    return { type: alertConstants.State.SUCCESS, message };
};

const info = (message) => {
    toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    return { type: alertConstants.State.SUCCESS, message };
};

const warn = (message) => {
    toast.warn(message, { position: toast.POSITION.BOTTOM_RIGHT });
    return { type: alertConstants.State.SUCCESS, message };
};

const error = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
    return { type: alertConstants.State.ERROR, message };
};

const clear = () => {
    return { type: alertConstants.State.CLEAR };
};
export const alertActions = {
    success,
    error,
    clear,
    warn,
    info,
};