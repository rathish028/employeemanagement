import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const BACKEND_URL = "http://localhost:8000"
export const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const mobileRegEx = /^\+?([0-9]{3})\)?[ -]?([0-9]{3})[ -]?([0-9]{4})$/;
export const urlRegEx =  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const getToken = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    if(token) {
        return (token)
    }
}

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
        return (user)
    }
}