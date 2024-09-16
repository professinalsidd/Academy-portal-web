import Axios from "../../base"

export const genderAPI = async () => {
    try {
        const response = await Axios.get('/gender')
        return response
    } catch (error) {
        throw error
    }
}

export const roleAPI = async () => {
    try {
        const response = await Axios.get('/role')
        return response
    } catch (error) {
        throw error
    }
}