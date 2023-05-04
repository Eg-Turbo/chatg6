import { toast } from "react-toastify"
export default function useToast() {
    return function addToast(type, message, config) {
        toast[type](message, {
            autoClose: 1000,
            hideProgressBar: true,
            ...config
        })
    }
}