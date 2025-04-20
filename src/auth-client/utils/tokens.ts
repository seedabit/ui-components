import { axiosInstance } from '@/utils/lib/axios-instance'

const tokenAPIRoute: string = '/auth/token' // API route for token validation
const refreshTokenAPIRoute: string = '/auth/refresh' // API route for refreshing tokens

async function checkToken(): Promise<boolean> {
    return await axiosInstance.get(tokenAPIRoute).then((/* res */) => {
        return true
    }).catch(() => {
        return false
    })
}

async function refreshTokens(): Promise<string[]> {
    try {
        const res = await axiosInstance.get(refreshTokenAPIRoute)
        const { token, refreshToken } = res.data

        return [token, refreshToken]
    } catch (error) {
        throw error
    }
}

export { checkToken, refreshTokens }
