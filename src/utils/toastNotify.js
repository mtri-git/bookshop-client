import { toast } from 'react-toastify'

const COMMON_OPTS = {
    position: 'top-center',
    autoClose: 2800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

const toast_error = (err) => {
    toast.error(err, { ...COMMON_OPTS, theme: 'colored' })
}

const toast_success = (message) => {
    toast.success(message, { ...COMMON_OPTS, theme: 'light' })
}

const toast_info = (message) => {
    toast.info(message, { ...COMMON_OPTS, theme: 'light' })
}

export { toast_error, toast_success, toast_info }