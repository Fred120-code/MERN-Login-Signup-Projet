import {toast} from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
    });
}

export const handleError = (message) => {
    toast.info(message, {
        position: 'top-right',
    });
}