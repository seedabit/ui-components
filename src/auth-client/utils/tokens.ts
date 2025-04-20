import { axiosInstance } from '../utils/lib/axios-instance'

async function checkToken(): Promise<boolean> {
    return await axiosInstance.get('/auth/token').then((/* res */) => {
        return true
    }).catch(() => {
        return false
    })
}

async function refreshTokens(): Promise<string[]> {
    try {
        const res = await axiosInstance.get('/auth/refresh')
        const { token, refreshToken } = res.data

        return [token, refreshToken]
    } catch (error) {
        throw error
    }
}

export { checkToken, refreshTokens }
