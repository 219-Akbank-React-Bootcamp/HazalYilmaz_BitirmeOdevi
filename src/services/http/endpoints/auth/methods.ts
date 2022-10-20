import { instance as service } from "../../instance"
import { LoginRequestPayload, RegisterRequestPayload } from "./types"


export const login = (payload:LoginRequestPayload) => {
    return service.post('auth/login', payload)
}
export const register = (payload:RegisterRequestPayload) => {
    return service.post('auth/register', payload)
}

